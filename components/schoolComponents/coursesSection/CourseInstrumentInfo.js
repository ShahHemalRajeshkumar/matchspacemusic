import { sortSkillLevels } from '@/utils/teacherInfo';
import { translateENtoDE, translateFieldKeyToEN } from 'functions/translator';
import React from 'react';
import cx from 'classnames';

function CourseInstrumentInfo({ isConfigurator, language, course, rowLineClasses, itemReachPoint, kidsCourses, adultsCourses}) {
  return (
    <div
      className={cx(
        {
          'flex flex-col': isConfigurator,
          '': !isConfigurator,
        },
        'border-b-[1px] border-[#E4E7EC] pb-[20px] mb-[20px]'
      )}>
      <div
        className={cx('flex flex-col gap-[24px]', {
          'mt-3': isConfigurator,
        })}>
        <div className='flex sm:flex-row flex-col w-full justify-between gap-y-[24px] gap-2'>
          {/* instruments */}
          <div className='w-full max-w-[280px]'>
            <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de] mb-[8px]'>
              {translateENtoDE(`Instruments`, language) + ':'}
            </p>
            {/* <CourseInstrumentIcon className='mr-3' /> */}
            <div className='flex flex-wrap items-center gap-1'>
              {
                <div
                  className={`${rowLineClasses} ${
                    course?.instrument?.key == 'Rental Instruments Available' && 'bg-[#ADDEC9]'
                  }`}>
                  <div className='ms_instruments'>
                    <div
                      className={`ms_instruments-${String(course?.instrument?.key)
                        .toLowerCase()
                        .replace(' ', '_')} text-[19px] font-medium text-[#000000ad]`}
                    />
                  </div>
                  {course?.instrument && course?.instrument[language === 'ch-de' ? 'de' : 'en']}
                </div>
              }
              {course?.partsgroup_rental ? (
                <div className={`${rowLineClasses} bg-[#ADDEC9]`}>
                  {translateENtoDE('Rental instrument available', language)}
                </div>
              ) : null}
            </div>
          </div>

          <div className='w-full max-w-[280px]'>
            <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de] mb-[8px]'>
              {translateENtoDE('Age groups taught', language) + ':'}
            </p>
            <div>
              {/* <PeopleIcon className='mr-2' /> */}
              <div className='flex items-center gap-1'>
                {course?.age_groups?.sort()?.map((ageItem, idx) => (
                  <div key={idx} className={rowLineClasses}>
                    {translateFieldKeyToEN(ageItem, language)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='flex sm:flex-row flex-col w-full justify-between gap-y-[24px] gap-2'>
          <div className='w-full max-w-[280px]'>
            <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de]'>
              {translateENtoDE('Skill levels taught', language) + ':'}
            </p>
            <div className='flex flex-wrap gap-1 mt-[8px]'>
              {/* <CourseLevelIcon className='mr-2' /> */}
              {sortSkillLevels(course?.skill_levels).length > 0
                ? sortSkillLevels(course?.skill_levels)?.map((ageItem, idx) => (
                    <div key={idx} className={rowLineClasses}>
                      {translateFieldKeyToEN(ageItem, language)}
                    </div>
                  ))
                : course?.skill_levels?.map((skill, idx) => (
                    <div key={idx} className={rowLineClasses}>
                      {translateFieldKeyToEN(skill.toLowerCase(), language)}
                    </div>
                  ))}
            </div>
          </div>

          <div className='w-full max-w-[280px]'>
            <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de]'>
              {translateENtoDE('Lesson frequencies', language) + ':'}
            </p>
            <div className='flex  flex-wrap items-center gap-1 mt-[8px]'>
              {course?.lesson_qts?.map((lesson, idx) => {
                return (
                  <div key={idx} className={`whitespace-nowrap ${rowLineClasses}`}>
                    <p>{`${lesson} ${
                      lesson.split('-')[0] > 1
                        ? language == 'ch-de'
                          ? 'Lektionen'
                          : 'lessons'
                        : language == 'ch-de'
                        ? 'Lektion'
                        : 'lesson'
                    }`}</p>
                  </div>
                );
              })}
              {course?.frequencies?.map((freq, idx) => {
                if (freq?.key == 'weekly') return;
                return (
                  <div key={idx} className={`whitespace-nowrap ${rowLineClasses}`}>
                    <p>{`${language == 'ch-en' ? freq.en : freq.de}`}</p>
                  </div>
                );
              })}
              <div className={`whitespace-nowrap ${rowLineClasses}`}>
                <p>{`${language == 'ch-en' ? 'weekly' : 'wöchentlich'}`}</p>
              </div>
            </div>
          </div>
        </div>

        {/* lession duration */}
        <div ref={itemReachPoint} className='w-full max-w-[280px]'>
          <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de]'>
            {translateENtoDE('Lesson durations', language) + ':'}
          </p>
          <div className='flex md:flex-nowrap flex-wrap items-center gap-1 mt-[8px]'>
            {course?.durations.map((duration, idx) => {
              return (
                <div key={idx} className={`whitespace-nowrap ${rowLineClasses}`}>
                  <p>{`${duration} ${translateENtoDE('mins.', language)}`}</p>
                </div>
              );
            })}
          </div>
        </div>

        {kidsCourses.length > 0 ||
          (adultsCourses.length > 0 && (
            <div className='flex sm:flex-row flex-col w-full justify-between gap-y-[24px] gap-2'>
              {kidsCourses.length > 0 && (
                <div className='w-full max-w-[280px]'>
                  <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de]'>
                    {translateENtoDE('Offers for', language)} {translateENtoDE('Kids', language)}
                  </p>
                  <div className='flex flex-col gap-1 mt-[8px]'>
                    <div className={rowLineClasses}>{`Weekly: ${kidsCourses.length} ${translateENtoDE(
                      'lessons',
                      language
                    )}`}</div>
                    <div className={rowLineClasses}>{`Every 2 Weeks: ${kidsCourses.length} ${translateENtoDE(
                      'lessons',
                      language
                    )}`}</div>
                  </div>
                </div>
              )}

              {adultsCourses.length > 0 && (
                <div className='w-full max-w-[280px]'>
                  <p className='text-[14px] font-Roboto leading-[150%] font-semibold text-[#000000de]'>
                    {translateENtoDE('Offers for', language)} {translateENtoDE('Adults', language)}
                  </p>
                  <div className='flex flex-col gap-1 mt-[8px]'>
                    <div className={rowLineClasses}>{`Weekly: ${adultsCourses.length} ${translateENtoDE(
                      'lessons',
                      language
                    )}`}</div>
                    <div className={rowLineClasses}>{`Every 2 Weeks: ${adultsCourses.length} ${translateENtoDE(
                      'lessons',
                      language
                    )}`}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CourseInstrumentInfo;
