import ShowMoreTextNext from '@/utils/schoolpage/showMoreTextNext';
import { translateENtoDE } from 'functions/translator';
import React from 'react';
import { FieldBlock } from '../commonComponent/fieldsBlock';
import { TeachingLocation } from '../commonComponent/TeachingLocation';

function TeacherInformation({
  teacherDetails,
  language,
  instrumentsData,
  itemReachPoint,
  isGenreExpend,
  setIsGenreExpend,
  width,
  isReached,
  setIsMoreCourseSidebarOpen,
  filterLocation,
  expandedGenres
}) {
  return (
    <div className='w-full sm:max-w-[584px] sm:min-w-[300px]'>
      {teacherDetails?.about_me && (
        <div className=''>
          <h5 className='font-bold text-[17px] sm:text-[19px] font-Roboto leading-[126%] text-[#000000DE] mb-4'>
            {translateENtoDE('About me', language)}
          </h5>
          <ShowMoreTextNext
            maxLength={200}
            language={language}
            showButtonLabel={translateENtoDE('Show more', language)}>
            {teacherDetails?.about_me?.mzo
              ? teacherDetails?.about_me?.mzo
              : language == 'ch-en'
              ? teacherDetails?.about_me.en
              : teacherDetails?.about_me.de}
          </ShowMoreTextNext>
        </div>
      )}

      <div className='mt-[20px]'>
        <h6 className='text-[14px] font-Roboto text-[#000000DE] font-semibold'>
          {translateENtoDE(`Instruments`, language) + ':'}
        </h6>
        <div className='flex flex-wrap gap-2 xs:gap-1 mt-2'>
          {[...new Set([...teacherDetails?.i_keys])]?.map((instrument, idx) => {
            const findInstrument = instrumentsData.find(
              (item, index) => item.key.toLowerCase() == instrument.toLowerCase()
            );
            return (
              <div
                key={idx}
                className='flex items-center gap-[8px] py-[7px] px-[9px] bg-[#F2F4F7] rounded-[4px] text-[14px] font-medium font-Roboto leading-[115%] text-[#000000AD] capitalize'>
                <div className='ms_instruments'>
                  <div
                    className={`ms_instruments-${String(findInstrument?.key)
                      .toLowerCase()
                      .replace(' ', '_')} text-[19px] font-medium text-[#000000ad]`}
                  />
                </div>

                <div className='text-[14px] font-Roboto font-medium text-[#000000ad]'>
                  {language == 'ch-en' ? findInstrument?.en : findInstrument?.de.toLowerCase().replace('_', ' ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='mt-[20px] grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-[16px] w-full  border-b-[1px] border-[#E4E7EC] pb-[20px] mb-[20px]'>
        <div>
          <h6 className='text-[14px] font-Roboto text-[#000000DE] font-semibold'>
            {translateENtoDE('Age groups thought', language) + ':'}
          </h6>
          <div className='mt-2 flex items-center gap-[4px]'>
            {teacherDetails?.ages &&
              teacherDetails?.ages.map((age, idx) =>
                FieldBlock(
                  translateENtoDE(
                    age.replace(/^./, (c) => c.toUpperCase()),
                    language
                  ),
                  idx
                )
              )}
          </div>
        </div>
        <div>
          <h6 className='text-[14px] font-Roboto text-[#000000DE] font-semibold'>
            {translateENtoDE(`Languages`, language) + ':'}
          </h6>
          <div className='mt-2 flex flex-wrap gap-[4px]'>
            {teacherDetails?.languages?.map((item, idx) => FieldBlock(language == 'ch-en' ? item.en : item.de, idx))}
          </div>
        </div>
        <div ref={itemReachPoint} className=''>
          <h6 className='text-[14px] font-Roboto text-[#000000DE] font-semibold whitespace-nowrap hyphens-auto'>
            {translateENtoDE(`Main musical genres`, language) + ':'}
          </h6>
          <div className='flex flex-wrap gap-[4px] mt-[8px]'>
            {expandedGenres(teacherDetails?.genres).map((genre, idx) =>
              FieldBlock(language == 'ch-en' ? genre.en : genre.de, idx)
            )}
            {!isGenreExpend && teacherDetails?.genres?.length > 5 && (
              <button
                onClick={() => setIsGenreExpend(!isGenreExpend)}
                className='py-[8px] px-[10px] bg-[#F2F4F7] rounded-[4px] text-[14px] font-medium font-Roboto leading-[115%] text-[#21697C] capitalize text-center'>
                {!isGenreExpend ? `${teacherDetails?.genres.length - 5}+` : ''}
              </button>
            )}
          </div>
          {width < 600 && isReached && (
            <div
              onClick={() => setIsMoreCourseSidebarOpen(true)}
              className='fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[100%] flex items-center justify-center bg-gradient-to-b from-[rgba(255,255,255,0)] to-white py-4'>
              <button className='bg-[#F9843B] text-white text-[15px] font-medium uppercase py-[13px] w-full max-w-[235px] rounded-full shadow-lg hover:bg-[#174d5b] transition'>
                {translateENtoDE('VIEW COURSES', language)}
              </button>
            </div>
          )}
        </div>
      </div>

      {filterLocation && filterLocation?.length > 0 && (
        <TeachingLocation title='Teaching locations' filterLocation={filterLocation} language={language} />
      )}

      <div>
        <div>
          <div className='mb-[20px]'>
            <h3 className={`font-bold text-[17px] sm:text-[19px] font-Roboto leading-[126%] text-[#000000DE mb-[16px]`}>
              {translateENtoDE(`My lessons`, language)}
            </h3>
            <ShowMoreTextNext
              maxLength={200}
              language={language}
              showButtonLabel={translateENtoDE('Show more', language)}>
              {teacherDetails?.quote?.mzo
                ? teacherDetails?.quote?.mzo
                : teacherDetails?.quote[language == 'ch-en' ? 'en' : 'de']}
            </ShowMoreTextNext>
          </div>
        </div>
        <h3 className={`font-bold text-[17px] sm:text-[19px] font-Roboto leading-[126%] text-[#000000DE] mb-[16px]`}>
          {translateENtoDE(`My specialization`, language)}
        </h3>
        <ShowMoreTextNext maxLength={200} language={language} showButtonLabel={translateENtoDE('Show more', language)}>
          {teacherDetails?.specialties?.mzo
            ? teacherDetails?.specialties?.mzo
            : teacherDetails?.specialties[language == 'ch-en' ? 'en' : 'de']}
        </ShowMoreTextNext>
      </div>
    </div>
  );
}

export default TeacherInformation;
