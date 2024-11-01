const LoadingSpin = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-backgroundGradient">
    <svg
      width="139"
      height="139"
      viewBox="0 0 139 139"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-bounceLoading"
    >
      <path
        d="M101.24 27.6148L60.1201 17.6535C45.6685 14.1525 31.115 23.0298 27.6141 37.4814L17.6527 78.601C14.1518 93.0526 23.0291 107.606 37.4807 111.107L78.6002 121.068C93.0519 124.569 107.605 115.692 111.106 101.24L121.068 60.1209C124.569 45.6692 115.691 31.1158 101.24 27.6148Z"
        fill="#00688A"
      />
      <path
        d="M27.1836 39.2637L120.637 61.9031L111.116 101.206C107.613 115.664 93.0399 124.567 78.6014 121.069L37.4818 111.108C23.0433 107.61 14.1599 93.0244 17.6623 78.5666L27.1836 39.2637Z"
        fill="#FFC914"
      />
      <path
        d="M63.4634 97.5216C73.3519 99.9171 83.2864 93.9406 85.6527 84.1727C88.019 74.4049 81.921 64.5445 72.0326 62.149C62.1441 59.7535 52.2097 65.7299 49.8434 75.4978C47.4771 85.2657 53.575 95.1261 63.4634 97.5216Z"
        fill="#00688A"
      />
      <path
        d="M64.8387 91.8439C71.5918 93.4798 78.3688 89.4293 79.9755 82.7968C81.5823 76.1643 77.4103 69.4614 70.6573 67.8254C63.9042 66.1895 57.1272 70.24 55.5204 76.8725C53.9137 83.505 58.0856 90.2079 64.8387 91.8439Z"
        fill="white"
      />
      <path
        d="M100.825 50.1683C104.443 51.0447 108.086 48.8224 108.962 45.2047C109.839 41.587 107.616 37.9438 103.999 37.0673C100.381 36.1909 96.7378 38.4132 95.8614 42.0309C94.985 45.6487 97.2072 49.2919 100.825 50.1683Z"
        fill="white"
      />
    </svg>
    <div className="mt-4 text-lg leading-[27px] text-secondary-900">모아가 여행을 준비중이에요</div>
  </div>
);

export default LoadingSpin;
