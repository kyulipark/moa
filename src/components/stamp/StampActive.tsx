'use client';

import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import browserClient from '@/utils/supabase/client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
// import { fetchUser } from '@/utils/fetchUser';
import useUser from '@/hooks/useUser';
// import { STAMPIMG_REGION_NAME } from '@/components/stamp/StampImg'; //이미지
import { STAMPIMG_REGION_IMG, STAMPIMG_REGION_ACTIVE_IMG } from '@/components/stamp/RegionNames';
import { AddressPropsType } from '@/types/stamp/AddressProps.types';

interface StampActivePropsType {
  address: AddressPropsType;
  setVisit: Dispatch<SetStateAction<boolean>>;
  visit: boolean;
  location: { lat: number; lng: number };
  stampList: any[] | null | undefined;
  aliasLocation: string | null;
}

//뮤테이션 함수 만들기(수파베이스 값 추가)
const addStampList = async ({
  regionName,
  address,
  userId,
  location,
  aliasLocation
}: {
  address: string;
  regionName: string;
  userId: string;
  location: { lat: number; lng: number };
  aliasLocation: string | null;
}) => {
  const { data, error } = await browserClient.from('stamp').insert({
    user_id: userId,
    region: regionName,
    address: address,
    stampimg: STAMPIMG_REGION_ACTIVE_IMG[regionName],
    visited: true,
    lat: location.lat,
    lng: location.lng,
    aliasLocation: aliasLocation
  });
  if (error) console.log('error', error);
  return data;
};

//뮤테이션 함수 만들기(수파베이스 값 삭제)
const deleteStampList = async ({ address, userId }: { address: string; userId: string }) => {
  const { data, error } = await browserClient.from('stamp').delete().eq('address', address).eq('user_id', userId);
  if (error) console.error('삭제중 오류 발생:', error);
  return data;
};

const StampActive = ({ address, stampList, setVisit, visit, location, aliasLocation }: StampActivePropsType) => {
  const queryClient = useQueryClient();
  const userId = useUser();

  //useMutation(삭제)
  const StampDeleteMutation = useMutation({
    mutationFn: deleteStampList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nowStamp'] });
    }
  });
  //useMutation(추가)
  const StampAddMutation = useMutation({
    mutationFn: addStampList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nowStamp'] });
    }
  });

  //mutate 추가이벤트(방문안한 상태에서 누르면)
  const onClickVisitedAdd = (address: string, regionName: string) => {
    if (userId) {
      StampAddMutation.mutate({ address, regionName, userId, location, aliasLocation });
      setVisit(true);
      // alert('스탬프가 찍혔습니다.');
    } else {
      console.error('유저아이디가 없습니다.');
      return;
    }
  };
  //mutate 삭제이벤트(방문한 상태에서 누르면)
  const onClickVisitedCencle = (address: string) => {
    if (userId) {
      StampDeleteMutation.mutate({ address, userId });
      setVisit(false);
      alert('스탬프가 취소되었습니다.');
    } else {
      console.error('유저아이디가 없습니다.');
      return;
    }
  };
  console.log('stampList', stampList);
  const DefaultStamp = STAMPIMG_REGION_IMG[address.region_1depth_name];
  const ActiveStamp = STAMPIMG_REGION_ACTIVE_IMG[address.region_1depth_name];

  return (
    <div
      className={`flex ${!visit ? 'h-[100vh]' : 'h-[30%]'} items-center justify-center transition-transform duration-500 ${visit ? 'scale-75' : 'scale-100'}`}
    >
      {stampList && stampList?.length > 0 ? (
        stampList?.map((stamp) => {
          if (stamp.region === address.region_1depth_name) {
            return (
              <Image
                key={stamp.id}
                className="opacity-100"
                src={ActiveStamp}
                alt={stamp.region}
                width={200}
                height={200}
                onClick={() => onClickVisitedCencle(address.address_name)}
              />
            );
          }
          return null;
        })
      ) : (
        <Image
          className="opacity-30"
          src={DefaultStamp}
          alt={address.region_1depth_name}
          width={200}
          height={200}
          onClick={() => onClickVisitedAdd(address.address_name, address.region_1depth_name)}
        />
      )}
    </div>
  );
};

export default StampActive;
