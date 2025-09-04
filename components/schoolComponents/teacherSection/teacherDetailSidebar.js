import { useEffect, useMemo, useRef, useState } from 'react';
import { translateENtoDE } from 'functions/translator';
import ArrowLeft from '@/components/icons/ArrowLeft';
import React from 'react';
import useScroll from '../onScrollShowPopup';
import useWindowSize from 'hooks/useWindowSize';
import ShareIcon from '@/components/icons/ShareIcon';
import CloseIcon from '@/components/icons/closeIcon';
import ShowMoreTextNext from '@/utils/schoolpage/showMoreTextNext';
import Spinner from '@/components/Spinner';
import { useSchoolPage } from '@/utils/context/SchoolPageContext';
import { FieldBlock } from '../commonComponent/fieldsBlock';
import { LessonsStepSection } from '../commonComponent/LessonsStepSection';
import { TeachingLocation } from '../commonComponent/TeachingLocation';
import { StepFormObject } from '@/utils/schoolpage/StepFormDetails';
import TeacherInformation from './TeacherInformation';

const TeacherDetailSidebar = React.memo(
  ({
    data,
    onClose,
    language,
    showPopup,
    isSidebarOpen,
    isTeacherDeatailLoading,
    instrumentsData,
    allOrganizationData,
  }) => {
    const [teacherDetails, setTeacherDetails] = useState(null);
    const [showCallButton, setShowCallButton] = useState(false);
    const [isGenreExpend, setIsGenreExpend] = useState(false);
    const { width } = useWindowSize();
    const { setCurrentSelectedTeacher, setIsMoreCourseSidebarOpen } = useSchoolPage();
    const itemReachPoint = useRef();
    const sidebarRef = useRef();
    const { isReached } = useScroll(itemReachPoint, sidebarRef);

    useEffect(() => {
      if (data) {
        setTeacherDetails(data);
      }
    }, [data]);

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

    const studioLocations = useMemo(() => {
      const data = [];

      return data?.flat();
    }, [teacherDetails]);

    const expandedGenres = (genres) => {
      return isGenreExpend ? genres : teacherDetails?.genres.slice(0, 5).map((item, index) => item);
    };

    const filterLocation =
      allOrganizationData
        ?.filter((location) => data?.region_ids?.find((item) => item == location?.id))
        .sort((a, b) => a?.slug?.localeCompare(b.slug, 'de')) ?? [];
    return (
      <div className='bg-white relative h-full overflow-y-scroll pb-14 sm:pb-0' ref={sidebarRef}>
        <ul className=''>
          <div className='flex justify-between items-center mb-[24px] p-[20px] border-b-[1px] border-[#E4E7EC] sticky top-0 bg-white z-30'>
            <div className='flex gap-3 items-center'>
              {isSidebarOpen && (
                <div onClick={onClose} className='cursor-pointer'>
                  <ArrowLeft />
                </div>
              )}
              <h3 className='font-semibold text-[19px] leading-[100%] tx-primary  font-Roboto'>
                {translateENtoDE('Teacher details', language)}
              </h3>
            </div>
            <div className='flex items-center gap-3'>
              <button
                onClick={() =>
                  showPopup(
                    'links',
                    { title: translateENtoDE('Share this page', language) },
                    setCurrentSelectedTeacher(teacherDetails)
                  )
                }>
                <ShareIcon className='w-[24px] h-[24px] cursor-pointer' />
              </button>
              <button onClick={onClose} className='text-gray-600 hover:text-red-500'>
                <CloseIcon />
              </button>
            </div>
          </div>
          {isTeacherDeatailLoading ? (
            <li className='flex items-center justify-center h-[80vh]'>
              {' '}
              <Spinner />
            </li>
          ) : teacherDetails ? (
            <li className='flex sm:flex-row flex-col gap-8 md:gap-[40px] px-[16px] sm:px-[24px] pb-[24px]'>
              <div className='w-full max-w-full sm:max-w-[288px] flex flex-col items-center '>
                <div className='w-full !max-w-[120px] sm:!max-w-[160px] md:!max-w-[200px] !h-[120px] sm:!h-[160px] md:!h-[200px] object-cover rounded-full overflow-hidden relative'>
                  <img
                    src={teacherDetails?.image_url || '/assets/images/teacherdefault.avif'}
                    alt='teacher image'
                    className='absolute inset-0 object-cover rounded-full'
                  />
                </div>
                <p className='text-[22px] sm:text-[24px] font-Roboto leading-[116%] text-[#000000DE] font-bold mt-[16px]'>
                  {teacherDetails?.name}
                </p>

                {LessonsStepSection(
                  StepFormObject,
                  language,
                  <div
                    onClick={() => setIsMoreCourseSidebarOpen(true)}
                    className='text-[15px] font-Roboto font-medium bg-[#21697C] text-white uppercase leading-[100%] cursor-pointer text-center py-[12px] rounded-full hover:bg-[#004252] transition duration-300 ease-linear border-[1px] border-transparent '>
                    {translateENtoDE(`VIEW COURSES`, language)}
                  </div>
                )}
              </div>

              <TeacherInformation
                teacherDetails={teacherDetails}
                language={language}
                instrumentsData={instrumentsData}
                itemReachPoint={itemReachPoint}
                isGenreExpend={isGenreExpend}
                setIsGenreExpend={setIsGenreExpend}
                width={width}
                isReached={isReached}
                setIsMoreCourseSidebarOpen={setIsMoreCourseSidebarOpen}
                filterLocation={filterLocation}
                expandedGenres={expandedGenres}
              />
            </li>
          ) : (
            <li className='text-gray-500 flex justify-center items-center h-[80vh]'>
              {translateENtoDE(`No teacher details found`, language)}
            </li>
          )}
        </ul>
      </div>
    );
  }
);

export default TeacherDetailSidebar;
