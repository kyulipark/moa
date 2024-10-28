'use client';

import React from 'react';
import Image from 'next/image';
import { FaBookmark } from 'react-icons/fa';
import browserClient from '../../utils/supabase/client';

interface Place {
  firstimage: string | null;
  city: string | null;
  supabaseText: string | null;
}

const fetchPlaces = async (): Promise<Record<string, Place[]>> => {
  const OPEN_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;
  const { data: supabaseData, error } = await browserClient.from('tourlist').select('contentid, text, city');

  if (error) {
    console.error('Supabase 데이터 요청 실패:', error);
    return {};
  }

  const contentIds = supabaseData.map((item) => item.contentid);

  const allPlaces: Place[] = await Promise.all(
    contentIds.map(async (contentid) => {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentid}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&numOfRows=50&pageNo=1&serviceKey=${OPEN_KEY}`
      );
      const json = await response.json();

      const placeData = supabaseData.find((item) => item.contentid === contentid);
      return {
        firstimage: json.response.body.items.item[0]?.firstimage ?? null,
        city: placeData?.city ?? null,
        supabaseText: placeData?.text ?? null
      };
    })
  );

  const groupedByCity: Record<string, Place[]> = allPlaces.reduce<Record<string, Place[]>>((acc, place) => {
    const city = place.city || '기타';
    if (!acc[city]) acc[city] = [];
    acc[city].push(place);
    return acc;
  }, {});

  return groupedByCity;
};

const RecommendedPlaces = async () => {
  const groupedPlaces = await fetchPlaces();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6 rounded-md bg-blue-500 p-4 text-white">
        <h1 className="text-xl font-bold">추천 국내 여행지</h1>
      </header>

      <main>
        {Object.entries(groupedPlaces).map(([city, places]) => (
          <div key={city} className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">{city}</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {places.map((place, index) => (
                <div
                  key={index}
                  className="relative min-w-[300px] max-w-xs flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 shadow-md"
                >
                  {/* 북마크 버튼 왼쪽 상단 */}
                  <button className="absolute left-2 top-2 z-10 rounded-full bg-white p-2 shadow-md">
                    <FaBookmark size={16} className="text-gray-600" />
                  </button>

                  <div className="relative h-48 w-full">
                    <Image
                      src={place.firstimage ? place.firstimage : '/placeholder.png'}
                      alt={place.supabaseText || '이미지 설명 없음'}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                    {/* 텍스트 오버레이 오른쪽 하단 */}
                    <div className="absolute bottom-2 right-2 rounded bg-opacity-60 p-2 text-white">
                      <h3 className="text-sm font-semibold">{place.supabaseText}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default RecommendedPlaces;
