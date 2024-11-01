import React, { useState } from 'react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/mousewheel';

interface photoInfoType {
  created_at: string;
  id: number;
  photoImg: string;
  region: string;
  user_id: number;
}
interface ImageModalType {
  selectedImgUrl: string;
  setImgModal: Dispatch<SetStateAction<boolean>>;
  regionPhoto: photoInfoType[] | null;
  activeImgId: string;
  setActiveImgId: Dispatch<SetStateAction<string>>;
}
const ImgModal = ({ setImgModal, selectedImgUrl, regionPhoto, activeImgId, setActiveImgId }: ImageModalType) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log('regionPhoto', regionPhoto);
  useEffect(() => {
    const index = regionPhoto.findIndex((photo: any) => photo.id === activeImgId); //TODO :any수정하기
    setCurrentIndex(index);
  }, [activeImgId, regionPhoto]);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#363636] bg-opacity-50">
      <div className="relative h-[90vh] w-full bg-[#D9D9D9]">
        <Swiper
          spaceBetween={0}
          pagination={{
            clickable: true
          }}
          modules={[Pagination]}
          initialSlide={currentIndex}
          className="mySwiper h-full"
        >
          {regionPhoto.map((photo: photoInfoType, index: number) => (
            <SwiperSlide key={index}>
              <Image src={photo.photoImg} alt={`Image ${index + 1}`} layout="fill" objectFit="cover" />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="absolute right-[10px] top-[-30px] text-white" onClick={() => setImgModal(false)}>
          X
        </button>
      </div>
    </div>
  );
};

export default ImgModal;
