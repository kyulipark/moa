'use client';

import { useQuery } from '@tanstack/react-query';
import { PAGE_NAMES } from '@/constants/pageName';
import { getPhotoCount } from '@/services/apis/mypage';

import Link from 'next/link';
import Image from 'next/image';
import useUserId from '@/hooks/auth/useUserId';

const PhotoCount = () => {
  const userId = useUserId();

  const {
    data: photoCount,
    isLoading,
    isError
  } = useQuery<number>({
    queryKey: ['photoCount', userId],
    queryFn: () => getPhotoCount(userId),
    enabled: !!userId
  });

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">로딩 중...</div>;
  }

  if (isError) {
    const errorMessage = '데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.';
    throw new Error(errorMessage);
  }

  return (
    <Link href={PAGE_NAMES.ALBUM.link}>
      <div className="relative flex h-[156px] flex-col justify-center overflow-hidden rounded-2xl bg-[#081425]/70 text-white">
        <Image src="/images/mypage/mypage_img.png" alt="배경 이미지" fill style={{ objectFit: 'cover' }} priority />
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative flex h-full w-full flex-col p-6">
          <p className="font-semiBold text-[14px]">나의 추억들</p>
          <p className="mt-1 font-regular text-xs">
            내가 지나간곳
            <br />
            내가 남긴 사진들
          </p>
          <span className="mt-4 font-bold text-xl">{`${photoCount}장`}</span>
        </div>
      </div>
    </Link>
  );
};

export default PhotoCount;
