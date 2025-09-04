import React from 'react';
import { CourseDetailsDesktopPriceCard } from '../commonComponent/CourseDetailsDesktopPriceCard';
import { translateENtoDE } from 'functions/translator';
import ShowMoreTextNext from '@/utils/schoolpage/showMoreTextNext';
import Minus from '@/components/icons/Minus';
import Pluse from '@/components/icons/Pluse';

function CoursePricesDetails({ course, language, isReached, width, handleSignUpUrl, organizationData, openIndexes, toggleAccordion }) {
  return (
    <>
      {course?.min_prices?.kids?.price || course?.min_prices?.adults?.price ? (
        <div className='mt-[24px] pb-[24px] border-b-[1px] border-[#E4E7EC]'>
          <p className='font-semibold text-[14px] leading-[150%] font-Roboto mb-[12px]'>
            {translateENtoDE('Starting from', language) + ':'}
          </p>
          <div className='flex sm:flex-row flex-col items-center justify-between w-full mt-[12px] gap-2.5'>
            {course?.min_prices?.kids?.price && (
              <CourseDetailsDesktopPriceCard
                priceData={course.min_prices.kids}
                label='for kids and young adults'
                language={language}
              />
            )}

            {isReached && width < 600 && (
              <div
                onClick={handleSignUpUrl}
                className='fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full flex items-center justify-center bg-gradient-to-b from-[rgba(255,255,255,0)] to-white py-4'>
                <button className='bg-[#F9843B] text-white text-[15px] font-medium uppercase py-3 w-full max-w-[235px] rounded-full shadow-lg hover:bg-[#174d5b] transition'>
                  {translateENtoDE('SIGN UP', language)}
                </button>
              </div>
            )}

            {course?.min_prices?.adults?.price && (
              <CourseDetailsDesktopPriceCard
                priceData={course.min_prices.adults}
                label='for adults'
                language={language}
              />
            )}
          </div>
          {course?.min_prices?.kids?.price || course?.min_prices?.adults?.price ? (
            <p className='mt-[12px] text-[15px] font-Roboto leading-[160%] text-[#000000ad]'>
              {translateENtoDE(
                `The prices quoted are indicative and may change according to the course configuration and possible subsidization after registration.`,
                language
              )}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className='mb-[24px]'>
        <div className='mt-[24px] mb-4'>
          <p className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto'>
            {translateENtoDE('About course', language)}
          </p>
        </div>
        <ShowMoreTextNext maxLength={200} language={language} showButtonLabel={translateENtoDE('Show more', language)}>
          {language == 'ch-en' ? course?.description.en : course?.description.de}
        </ShowMoreTextNext>
      </div>
      <div className='w-full'>
        <p className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto mb-[16px]'>FAQ</p>
        <div className='flex flex-col sm:gap-[8px]'>
          {organizationData?.faqs?.map((item, index) => (
            <div key={index} className='border-b border-[#EDF3F5] mbn'>
              <button
                className='w-full flex items-center justify-between rounded-full py-[8px] cursor-pointer transition-colors'
                onClick={() => toggleAccordion(index)}>
                <span className='text-[##000000ad] text-[14px] leading-[150%] font-Roboto text-left '>
                  {language == 'ch-en' ? item?.faq_title?.en : item?.faq_title?.de}
                </span>
                <span className='text-[20px] text-[#21697C] font-bold'>
                  {openIndexes === index ? <Minus /> : <Pluse />}
                </span>
              </button>

              {/* Animated answer section */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndexes === index ? 'h-auto pb-[8px] pt-[4px]' : 'h-0'
                }`}>
                <p className='text-[#000000ad] text-[13px] font-normal'>
                  {language == 'ch-en' ? item?.faq_text?.en : item?.faq_text?.de}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CoursePricesDetails;
