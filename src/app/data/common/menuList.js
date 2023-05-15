const menuList = [
  {
    title: '디바이스 현황',
    basePath: 'deviceStatus',
    subMenu: [
      { subTitle: '스테이션 상태', link: '/deviceStatus/stationStatus' },
      { subTitle: '장애현황', link: '/deviceStatus/disabilityStatus' },
    ],
  },
  {
    title: '서비스 조회',
    basePath: 'serviceInquiry',
    subMenu: [
      { subTitle: '대여 이력', link: '/serviceInquiry/rentalHistory' },
      { subTitle: '장애 이력', link: '' },
      { subTitle: '사용자 인증 이력', link: '' },
    ],
  },
  {
    title: '디바이스 관리',
    basePath: 'deviceManagement',
    subMenu: [
      { subTitle: '그룹관리', link: '' },
      { subTitle: '스테이션 관리', link: '' },
      { subTitle: '배터리 관리', link: '' },
      { subTitle: '디바이스 상세이력', link: '' },
      { subTitle: 'OTA', link: '' },
    ],
  },
  {
    title: '고객센터',
    basePath: 'serviceCenter',
    subMenu: [
      { subTitle: '고장신고 접수', link: '' },
      { subTitle: 'FAQ 관리', link: '' },
      { subTitle: 'Q&A 관리', link: '' },
      { subTitle: '공지사항 관리', link: '' },
    ],
  },
  {
    title: '시스템 관리',
    basePath: 'systemGuanil',
    subMenu: [
      { subTitle: '시스템 코드 관리', link: '' },
      { subTitle: '공통코드 관리', link: '' },
      { subTitle: '운영정보 관리', link: '' },
      { subTitle: '메뉴 관리', link: '' },
      { subTitle: '권한 관리', link: '' },
    ],
  },
];

export default menuList;
