const ComPass = ({ color = '#white' }) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 24C19.5228 24 24 19.5228 24 14C24 8.47715 19.5228 4 14 4C8.47715 4 4 8.47715 4 14C4 19.5228 8.47715 24 14 24ZM18.9498 9.05042L14.7071 11.8788L14.6005 12.092C13.9126 11.8761 13.131 12.0407 12.5858 12.5859C12.0407 13.131 11.876 13.9125 12.0918 14.6005L11.8787 14.707L9.05025 18.9497L13.2929 16.1213L13.3994 15.9082C14.0874 16.1241 14.869 15.9595 15.4142 15.4143C15.9594 14.8692 16.124 14.0876 15.9082 13.3996L16.1213 13.2931L18.9498 9.05042ZM14.7071 13.2928C15.0976 13.6833 15.0976 14.3165 14.7071 14.707C14.3166 15.0975 13.6834 15.0975 13.2929 14.707C12.9024 14.3165 12.9024 13.6833 13.2929 13.2928C13.6834 12.9023 14.3166 12.9023 14.7071 13.2928Z"
        fill={color}
      />
    </svg>
  );
};

export default ComPass;
