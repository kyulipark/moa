import Link from 'next/link';
import Icon from '../common/Icons/Icon';
import { Place, fetchPlaceData } from '@/serverActions/fetchPlacesAction';
import TouristSwiper from './TouristSwiper';
import { createClient } from '@/utils/supabase/server';

const MainRecommendSection = async () => {
  const serverClient = createClient();
  const { data } = await serverClient.auth.getUser();

  let places: Place[] | null = null;

  if (data?.user) {
    places = await fetchPlaceData(data.user.id);
  }

  console.log(places);
  return (
    <section className="mt-[58px]">
      <div className="flex flex-col items-start justify-start gap-1.5">
        <Link href={'/tourism'}>
          <div className="flex items-center justify-start gap-1">
            <p className="font-semiBold text-2xl leading-[31.20px] text-gray-900">모아가 추천하는 여행지</p>
            <Icon name="ArrowIcon" />
          </div>
        </Link>
        <p className="text-sm leading-tight text-gray-600">모아가 엄선 한 국내 여행지를 모았어요.</p>
      </div>
      {places && places.length > 0 ? (
        <TouristSwiper places={places} />
      ) : (
        <p className="text-sm text-alert">텅</p>
      )}
    </section>
  );
};

export default MainRecommendSection;
