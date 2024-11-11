'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import useUserId from '@/hooks/useUserId';
import { useGetStampListQuery } from '@/queries/query/useStampQuery';
import Loading from '@/app/(root)/(stamp)/loading';
import Icon from '@/components/common/Icons/Icon';
import useDropdoun from '@/hooks/useDropdoun';
import { REGION_NAME_MAP_EN } from '@/utils/region/RegionNames';
import { Stamp } from '@/types/supabase/table.type';

const StampItemDetail = () => {
  const userId = useUserId();
  const params = useParams();
  const region = REGION_NAME_MAP_EN[decodeURIComponent((params.id as string[]).toString())];
  const [stampData, setStampData] = useState<Stamp[]>([]);
  const { isOpen, toggleDropdown, dropdownRef } = useDropdoun();
  const { data: stampList, isLoading } = useGetStampListQuery(userId);

  console.log('stampData', stampData);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const res = stampList;
          const stampFilterList = res?.filter((item) => item.region === region) || [];
          console.log('stampFilterList', stampFilterList);
          setStampData(stampFilterList);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [params.id, userId, stampList]);

  // 가장 오래된 날짜 구하기
  const oldestDate = stampData.reduce((oldest, current) => {
    const oldestDate = oldest.created_at ? new Date(oldest.created_at) : new Date();
    const currentDate = current.created_at ? new Date(current.created_at) : new Date();
    return currentDate < oldestDate ? current : oldest;
  }, stampData[0]);

  if (!stampData || isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  //TODO :이미지명이랑 키값 동일하게하기
  return (
    <div className="flex h-[100%] flex-col bg-no-repeat pb-[200px] lg:mx-auto lg:w-full lg:max-w-[1080px]">
      <h2 className="mb-[102px] hidden font-bold text-[64px] text-secondary-900 lg:block">{region} 스탬프</h2>
      <div className="lg:flex">
        <div className="mo-only:bg-[#fff] mo-only:shadow-[0px_1px_12px_0px_rgba(0,0,0,0.15)] mo-only:h-[145px] mo-only:mb-[82px] relative block w-full lg:h-full lg:w-[50%]">
          <span className="mo-only:block absolute left-1/2 top-[16px] block hidden h-[180px] w-[180px] -translate-x-1/2 overflow-hidden rounded-full bg-white shadow-[0px_1px_12px_0px_rgba(0,0,0,0.15)]"></span>
          <div className="absolute h-full w-full bg-[#fff] lg:hidden"></div>
          <span className="mo-only:border-[6px] mo-only:border-secondary-300 absolute left-1/2 top-[16px] block h-[180px] w-[180px] -translate-x-1/2 overflow-hidden rounded-full bg-white p-[24px] lg:relative lg:h-full lg:max-h-[500px] lg:w-[100%] lg:max-w-[500px] lg:bg-[#F5F5F7] lg:p-[50px]">
            <div className="h-full w-full rounded-full bg-white">
              <Image
                src={`/images/${params.id}-active.png`}
                alt={region}
                width={300}
                height={300}
                className="w-[500px]"
              />
            </div>
          </span>
        </div>
        <div className="mx-[24px] mt-[31px] rounded-[24px] bg-white px-[28px] py-[34px] lg:m-0 lg:flex lg:w-[50%] lg:items-center lg:justify-start">
          <h2 className="mb-[24px] font-semiBold text-[20px] lg:hidden">{region} 스탬프</h2>
          <ul className="flex flex-col gap-[14px]">
            <li className="flex items-center justify-start gap-[8px]">
              <Icon name="TimeIcon" size={28} color="white" bgColor="#00688A" rx="16" />
              <p className="text-[#4F4F4F] lg:text-[24px]">
                {oldestDate?.created_at
                  ? new Date(oldestDate.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'N/A'}
              </p>
              <span className="text-[#4F4F4F] lg:text-[24px]">
                {oldestDate?.created_at ? new Date(oldestDate.created_at).getHours() : 'N/A'}시
              </span>
            </li>
            <li className="flex items-center justify-start gap-[8px]">
              <Icon name="ComPassIcon" size={28} color="white" bgColor="#00688A" rx="16" />
              <p className="ellipsis-multiline max-w-[300px] text-[#4F4F4F] lg:max-w-[40vw] lg:text-[24px]">
                {stampData[0] ? stampData[0].address : ''}
              </p>
            </li>
            <li className="flex items-center justify-start gap-[8px]">
              <Icon name="StampIcon" size={28} color="white" bgColor="#00688A" rx="16" />
              <p className="text-[#4F4F4F] lg:text-[24px]">{stampData.length}개</p>
            </li>
          </ul>
        </div>
      </div>
      <li
        className="mt-[55px] flex flex-col gap-[24px] px-[28px] lg:mx-auto lg:w-full lg:max-w-[70vw]"
        ref={dropdownRef}
      >
        <div
          className="flex items-center justify-start gap-[10px] border-b border-[#4F4F4F] py-[10px]"
          onClick={toggleDropdown}
        >
          <h2 className="font-semiBold text-[24px]">히스토리</h2>
          <button className={`transform transition-transform duration-500 ${isOpen ? 'rotate-90' : '-rotate-90'}`}>
            <Icon name="ArrowIcon" size={28} />
          </button>
        </div>
        {isOpen && (
          <ul className="flex animate-dropdownList flex-col gap-[12px] transition-all duration-300">
            {stampData.map((list) => (
              <li
                key={list.id}
                className="flex items-center justify-between rounded-[24px] bg-white px-[28px] py-[24px] lg:border lg:border-[#4F4F4F]"
              >
                <ul className="flex flex-col gap-[14px]">
                  <li className="flex items-center gap-[8px]">
                    <Icon name="TimeIcon" size={28} color="white" bgColor="#00688A" rx="16" />
                    <span className="ellipsis-multiline max-w-[300px] text-[#4F4F4F] lg:max-w-[40vw]">
                      {list.aliasLocation !== null ? list.aliasLocation : list.address}
                    </span>
                  </li>
                  <li className="flex items-center gap-[8px]">
                    <Icon name="ComPassIcon" size={28} color="white" bgColor="#00688A" rx="16" />
                    <span className="text-[#4F4F4F]">
                      {list.created_at
                        ? new Date(list.created_at).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'N/A'}
                    </span>
                    <span className="text-[#4F4F4F]">
                      {list.created_at ? new Date(list.created_at).getHours() : 'N/A'}시
                    </span>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </li>
    </div>
  );
};

export default StampItemDetail;
