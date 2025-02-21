import { useRouter } from 'next/navigation';
import { ReactPortal } from 'react';

interface AliasCheckModalPropsType {
  Modal: ({ children }: { children: React.ReactNode }) => ReactPortal | null;
}

const AliasCheckModal = ({ Modal }: AliasCheckModalPropsType) => {
  const router = useRouter();

  return (
    <Modal>
      <div
        onClick={(e) => e.stopPropagation()} //이벤트전파방지
        className="modal-box flex flex-col"
      >
        <h2 className="mb-[12px] font-semiBold text-[20px]">별명을 등록하지 않으실건가요?</h2>
        <span className="mb-[36px] leading-6 text-[#4F4F4F]">
          별명을 등록하지 않으면
          <br />
          현재 주소로 등록됩니다.
        </span>
        <button
          onClick={() => {
            router.push('/stamp-all');
            router.refresh();
          }}
        >
          <p className="w-full rounded-[12px] bg-secondary-500 py-[21px] text-center font-semiBold text-[#004157] hover:bg-[#BDEFFF]">
            알겠어요!
          </p>
        </button>
      </div>
    </Modal>
  );
};

export default AliasCheckModal;
