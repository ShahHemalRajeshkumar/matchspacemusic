import cx from 'classnames';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import ArrowLeft from '../../icons/ArrowLeft';
import useScroll from '../onScrollShowPopup';
import CloseIcon from '@/components/icons/closeIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';
import { LessonsStepSection } from '../commonComponent/LessonsStepSection';
import { TeachingLocation } from '../commonComponent/TeachingLocation';
import { StepFormObject } from '@/utils/schoolpage/StepFormDetails';
import CourseInstrumentInfo from './CourseInstrumentInfo';
import CoursePricesDetails from './CoursePricesDetails';
import { translateENtoDE } from 'functions/translator';

const OrganizationCouresDetailSidebar = ({
  language,
  course = {},
  onClose,
  isConfigurator,
  showPopup,
  isSidebarOpen,
  organizationData,
  isLoading,
  allOrganizationData,
}) => {
  const contentRef = useRef(null);
  const [showCallButton, setShowCallButton] = useState(false);
  const { width } = useWindowSize();
  const itemReachPoint = useRef();
  const sidebarRef = useRef();
  const { isReached } = useScroll(itemReachPoint, sidebarRef);
  const rowLineClasses =
    'flex items-center gap-[6px]  py-[6px] px-[6px] bg-[#F2F4F7] rounded-[4px] leading-[142%] text-[#000000AD] text-[14px] font-medium w-fit';
  const { query } = useRouter();
  const kidsCourses = course?.prices?.filter((item) => item.age_taught === 'kids') || [];
  const adultsCourses = course?.prices?.filter((item) => item.age_taught === 'adults') || [];
  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = sidebarRef.current;
        setShowCallButton(scrollTop + clientHeight >= scrollHeight - 30);
      }
    };

    if (sidebarRef.current) {
      sidebarRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (sidebarRef.current) {
        sidebarRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const lowestAndHighest = useMemo(() => {
    const prices = course?.prices;
    if (!prices || prices.length === 0) return [];
    if (prices.length === 1) {
      return [prices[0]];
    }
    const sortedPrices = prices.sort((a, b) => a.price - b.price);
    return [sortedPrices[0], sortedPrices[sortedPrices.length - 1]];
  }, [course?.prices]);

  const faqs = [
    { question: 'What is your refund policy?', answer: 'You can request a refund within 14 days of purchase.' },
    {
      question: 'How do I change my account settings?',
      answer: 'Go to your profile and click on settings to update your details.',
    },
    {
      question: 'Can I upgrade my subscription later?',
      answer: 'Yes, you can upgrade anytime from the billing section.',
    },
    { question: 'Is there a free trial available?', answer: 'Yes, we offer a 7-day free trial for new users.' },
  ];
  const [openIndexes, setOpenIndexes] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndexes((prev) => (prev == index ? null : index));
  };

  function handleSignUpUrl() {
    const urlPrefix =
      process.env.NEXT_PUBLIC_ENVIRONMENT == 'staging'
        ? 'https://staging.matchspace.click'
        : 'https://app.matchspace-music.ch';
    const organization = query?.organization;
    const currentSlug = organizationData?.slug;

    const url = `${urlPrefix}/music-school/${organization}/signup?region=${currentSlug}&course_id=${
      course?.id
    }&language=${language.split('-')[1]}`;
    window?.open(url, '_blank');
  }

  const filterLocation =
    allOrganizationData
      ?.filter((location) => course?.region_ids?.find((item) => item == location?.id))
      .sort((a, b) => a?.slug?.localeCompare(b.slug, 'de')) ?? [];

  return (
    <div id={`course-popup-${course?.id}`} className=' h-full overflow-y-scroll pb-14 sm:pb-0' ref={sidebarRef}>
      <div className='flex justify-between items-center mb-[24px] p-[20px] border-b-[1px] border-[#E4E7EC] sticky top-0 bg-white z-[40]'>
        <div className='flex gap-3 items-center'>
          {isSidebarOpen && (
            <div onClick={onClose} className='cursor-pointer'>
              <ArrowLeft />
            </div>
          )}
          <h3 className='font-semibold text-[19px] tx-primary  font-Roboto'>
            {language == 'ch-en' ? 'Course details' : 'Kurs-Details'}
          </h3>
        </div>
        <div className='flex items-center gap-3'>
          <button onClick={() => showPopup('links', { title: translateENtoDE('Share this page', language) })}>
            <ShareIcon className='w-[24px] h-[24px]' />
          </button>
          <button onClick={onClose} className='text-gray-600 hover:text-red-500'>
            <CloseIcon />
          </button>
        </div>
      </div>
      {isLoading ? (
        <li className='flex items-center justify-center h-[80vh]'>
          {' '}
          <Spinner />
        </li>
      ) : (
        <div className='flex sm:flex-row flex-col justify-between gap-[8px] sm:gap-4 md:gap-[40px] px-4 md:px-[24px] pb-[24px] '>
          <div className='w-full sm:max-w-[288px]'>
            <div className='relative overflow-hidden'>
              {!!course?.instrument?.image_url ? (
                <div className='w-full max-w-full smd:max-w-[288px] h-[192px] [&>span]:!h-full [&>span]:!w-full'>
                  <Image
                    layout='fixed'
                    objectFit='cover'
                    className='rounded-lg w-full max-w-full sm:!max-w-[288px] !h-[182px]'
                    src={course?.instrument?.image_url}
                    alt={`${course?.name} course image`}
                    height={isConfigurator ? (width < 500 ? 234 : 220) : 170}
                    width={isConfigurator ? (width < 500 ? window.innerWidth - 30 : 340) : 254}
                  />
                </div>
              ) : (
                <div className='rounded-lg w-full max-w-full sm:!max-w-[288px] !h-[182px] bg-gray-200'></div>
              )}
              {!isConfigurator && !!course?.is_full && (
                <div
                  style={{ width: `${isConfigurator ? (width < 500 ? 280 : 350) : 250}px` }}
                  className='teacher-content-course-booked'>
                  {translateENtoDE('Fully booked', language)}
                </div>
              )}
            </div>
            <p className='text-[14px] font-bold text-[#000000ad] mt-[16px]'>
              {course?.mzo_course_category?.type_name[language == 'ch-en' ? 'en' : 'de']}
            </p>
            <h3 className={cx(' text-[17px] sm:text-[19px] leading-[24px] font-bold mb-[16px] mt-[4px]')}>
              {language == 'ch-en' ? course?.title?.en : course?.title?.de}
            </h3>
            {LessonsStepSection(
              StepFormObject,
              language,
              <button
                onClick={() => handleSignUpUrl()}
                className='text-[15px] font-Roboto font-medium bg-[#21697C] text-white uppercase leading-[100%] cursor-pointer text-center py-[12px] rounded-full  hover:bg-[#004252] transition duration-300 ease-linear border-[1px] border-transparent '>
                {translateENtoDE(`Sign up`, language)}
              </button>
            )}
          </div>

          <div ref={contentRef} className='w-full max-w-full smd:max-w-[584px] sm:mt-0 mt-[16px] '>
            <div className='flex items-center justify-between mb-[24px]'>
              <h2 className='font-bold text-[17px] sm:text-[19px] leading-[126.316%] font-Roboto '>
                {translateENtoDE(`Course information`, language)}
              </h2>
              <span className='text-[13px] font-Roboto leading-[123%] text-[#000000ad]'>{`Id : ${course?.id}`}</span>
            </div>
            <div>
              <CourseInstrumentInfo
                isConfigurator={isConfigurator}
                language={language}
                course={course}
                rowLineClasses={rowLineClasses}
                itemReachPoint={itemReachPoint}
                kidsCourses={kidsCourses}
                adultsCourses={adultsCourses}
              />

              {filterLocation && filterLocation?.length > 0 && (
                <TeachingLocation title='Teaching locations' filterLocation={filterLocation} language={language} />
              )}

              <CoursePricesDetails
                course={course}
                language={language}
                isReached={isReached}
                width={width}
                handleSignUpUrl={handleSignUpUrl}
                organizationData={organizationData}
                openIndexes={openIndexes}
                toggleAccordion={toggleAccordion}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(OrganizationCouresDetailSidebar);
