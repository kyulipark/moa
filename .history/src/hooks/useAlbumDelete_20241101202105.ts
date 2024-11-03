import { useState } from 'react';
import { useAlbumDeleteMutation } from '@/hooks/useAlbumList';

const useAlbumDelete = () => {
  const [edit, setEdit] = useState(false);
  const [deleteId, setDeleteId] = useState<number[]>([]);
  const AlbumDeletemutation = useAlbumDeleteMutation();
  //체크이벤트로 아이디값 배열로 담기
  const handleCheckboxChange = (id: number) => {
    setDeleteId((prev) => {
      if (prev.includes(id)) {
        //선택한아이디들에 아이디가 포함되어있으면
        return prev.filter((item) => item !== id); //아이디중복제거
      } else {
        return [...prev, id];
      }
    });
  };

  //선택한이미지 삭제이벤트(유효성검사)
  const onHandleDelete = async () => {
    if (deleteId.length === 0) {
      alert('선택된 앨범이 없습니다.');
      return;
    } else if (window.confirm('앨범에서 삭제하시겠습니까?')) {
      await AlbumDeletemutation.mutate(deleteId);
      alert('삭제되었습니다.');
    }
  };

  return {
    edit,
    setEdit,
    deleteId,
    setDeleteId,
    handleCheckboxChange,
    onHandleDelete
  };
};

export default useAlbumDelete;
