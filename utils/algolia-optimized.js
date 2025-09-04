const INDEX = process.env.ALGOLIA_TEACHERINDEX;
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

const getCacheKey = (params) => JSON.stringify(params);

const isValidCache = (timestamp) => Date.now() - timestamp < CACHE_TTL;

export const getAlgoliaData = async ({ id, type }) => {
  const cacheKey = getCacheKey({ id, type });
  const cached = cache.get(cacheKey);
  
  if (cached && isValidCache(cached.timestamp)) {
    return cached.data;
  }

  let key = '';
  let path = '';
  const isProd = INDEX?.includes('ms_');
  const url = isProd ? 'https://app.matchspace-music.ch' : 'https://staging.matchspace.click';

  if (type === 'courses' && id) {
    key = 'course_lists';
    path = `course_ms/courses/${id}`;
  }
  if (type === 'likes' && id) {
    key = 'recommendations';
    path = `course_ms/recommendations/list/${id}`;
  }
  if (type === 'instruments') {
    key = id ? 'music_instrument' : 'music_instruments';
    path = `course_ms/instruments${id ? `/${id}` : ''}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${url}/api/v1/${path}`, {
      method: 'POST',
      headers: {
        'X-TENANT-ID': 'matchspace',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const parsed = await response?.json();
    const result = { data: [...(parsed ? parsed[key] : [] || [])] };

    cache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  } catch (error) {
    return { data: [], error: error?.message };
  }
};

const USERNAME_EXCEPTIONS = ['null', 'apple-touch-icon.png'];

export const getTeacherInfo = async (username) => {
  const cacheKey = `teacher_${username}`;
  const cached = cache.get(cacheKey);
  
  if (cached && isValidCache(cached.timestamp)) {
    return cached.data;
  }

  const isProd = INDEX?.includes('ms_');
  const url = isProd ? 'https://app.matchspace-music.ch' : 'https://staging.matchspace.click';

  try {
    if (username && !USERNAME_EXCEPTIONS.includes(username)) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${url}/api/v1/auth_ms/teacher/show_uuid`, {
        method: 'POST',
        headers: {
          'X-TENANT-ID': 'matchspace',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      const data = await response?.json();

      if (data?.uuid && data?.uuid !== 'null') {
        const teacherResponse = await fetch(`${url}/api/v1/auth_ms/teacher/show`, {
          method: 'POST',
          headers: {
            'X-TENANT-ID': 'matchspace',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uuid: data?.uuid }),
          signal: controller.signal,
        });
        const teacherData = await teacherResponse?.json();
        const result = teacherData?.teacher;

        cache.set(cacheKey, { data: result, timestamp: Date.now() });
        return result;
      }

      return null;
    }

    return null;
  } catch (error) {
    return null;
  }
};