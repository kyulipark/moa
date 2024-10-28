import browserClient from '@/utils/supabase/client';
import { fetchUser } from '@/utils/fetchUser';

//로그인유저의 스템프 항목 중 현재위치 주소가 일치한거만 패치
export const fetchStampList = async (address: string) => {
  const userData = await fetchUser();
  if (!userData) {
    console.error('사용자 데이터를 가져오지못했습니다.');
    return;
  } else {
    console.log('userData', userData);
  }
  const { data: nowStampList, error } = await browserClient
    .from('stamp')
    .select('*')
    .eq('user_id', userData)
    .eq('address', address);
  if (error) console.error('가져오기 오류2:', error.message);
  return nowStampList;
};

// export const fetchStamp = async (userId: string, paramsId: string, setStampData: (data: any) => void) => {
//   const { data, error } = await browserClient.from('stamp').select('*').eq('user_id', userId).eq('id', paramsId);
//   if (error) {
//     console.error('가져오기 오류3:', error.message);
//   } else {
//     setStampData(data[0]);
//   }
// };

//로그인유저의 스템프 항목 전부 + 스탬프 활성화된 데이터만
export const fetchStampActive = async (userId: string) => {
  const { data, error } = await browserClient.from('stamp').select('*').eq('user_id', userId).eq('visited', true);
  if (error) {
    console.error('가져오기 오류1:', error.message);
  }
  return data;
};
