'use client';

import React, { useEffect, useState } from 'react';
import StampItem from '@/components/stamp/StampItem';
// import { useQuery } from '@tanstack/react-query';
import useUserId from '@/hooks/useUserId';
import Image from 'next/image';
import { DEFAULT_REGION_ITEM } from '@/constants/regions';
import { useGetStampListQuery } from '@/queries/query/useStampQuery';
import Loading from '@/app/(root)/(stamp)/loading';
import { STAMPIMG_REGION_IMG } from '@/utils/region/RegionNames';
import { promptLogin } from '@/utils/promptLogin';

const StampList = () => {
  const userId = useUserId();
  const { data: stampList = [], isLoading } = useGetStampListQuery(userId);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  const loginRequiredRegions = Object.entries(STAMPIMG_REGION_IMG).map(([region, img]) => ({ region, img })); //비활성화지역이름(로그인안한상태)
  const ActiveRegionList = [...new Set(stampList?.map((item) => item.region))]; //갖고있는스탬프 지역이름
  const DeactiveRegionList = DEFAULT_REGION_ITEM.filter((item) => !ActiveRegionList.includes(item)); //비활성화 지역

  return (
    <ul className="grid grid-cols-2 gap-[15px] py-[42px] lg:grid-cols-5 lg:gap-[16px]">
      {userId ? (
        <>
          {ActiveRegionList?.map((list) => <StampItem key={list} list={list} stampList={stampList} />)}
          {DeactiveRegionList &&
            DeactiveRegionList.map((stamp) => (
              <li key={stamp} className="flex flex-col items-center justify-center rounded-[24px] bg-[#ccc] p-3">
                {/* TODO : 스탬프 준비되면 교체 */}
                {/* <Image src={`/images/${stamp}.png`} alt={stamp} width={300} height={300} className="opacity-50" />  */}
                <Image src={`/images/preparing-img.png`} alt={stamp} width={300} height={300} />
                {/* <div className="font-black">{stamp}</div> 비활성지역이름 */}
              </li>
            ))}
        </>
      ) : (
        <>
          {/* 로그인안됬을때 화면 */}
          {loginRequiredRegions.map((stamp) => (
            <li key={stamp.region} className="flex flex-col items-center justify-center rounded-[24px] bg-[#ccc] p-3">
              <Image src={stamp.img} alt={stamp.region} width={300} height={300} onClick={promptLogin} />
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default StampList;
