/* =========================================================
   HeyFolio v2 — 콘텐츠 데이터
   스킬·프로젝트를 추가/수정할 때는 이 파일만 고치면 됩니다.
   ========================================================= */
const HEYFOLIO = {
    // 히어로 타이핑 키워드
    keywords: ['성실', '책임감', '적극적', '활발한', '긍정적'],

    // 스킬 탭
    skillGroups: [
        { id: 'all', label: 'All' },
        { id: 'lang', label: 'Language' },
        { id: 'front', label: 'FrontEnd' },
        { id: 'back', label: 'BackEnd' },
        { id: 'etc', label: 'ETC' }
    ],

    skills: [
        { group: 'lang', name: 'HTML', icon: './img/ht.png',
            desc: '시멘틱 태그를 포함한 HTML5의 핵심 요소를 활용하여 구조적이고 가독성이 높은 웹 페이지를 구현할 수 있습니다.' },
        { group: 'lang', name: 'CSS', icon: './img/cs.png',
            desc: 'CSS를 활용하여 반응형 웹 디자인을 구현하고, 유연한 레이아웃을 구성할 수 있습니다.' },
        { group: 'lang', name: 'JavaScript', icon: './img/ja.png',
            desc: 'ES6+ 문법을 기반으로 Canvas와 Scroll Event 등의 효과를 작성할 수 있으며, 다양한 API를 활용하여 동적인 웹 애플리케이션을 개발할 수 있습니다.' },
        { group: 'lang', name: 'Sass · Pug', icon: './img/sa.png',
            desc: 'Sass와 Pug를 활용하여 스타일과 템플릿을 조금 더 효율적으로 작성하고, 유지보수하기 쉬운 구조를 구성해 보았습니다.' },
        { group: 'front', name: 'jQuery', icon: './img/jq.png',
            desc: 'jQuery를 활용하여 보다 간결하고 직관적인 코드로 DOM 조작 및 이벤트 핸들링을 효율적으로 구현할 수 있습니다.' },
        { group: 'front', name: 'React', icon: './img/re.png',
            desc: '컴포넌트 기반 아키텍처를 이해하고 있으며, useEffect 등 Hooks의 개념을 적용하여 동적인 웹 애플리케이션을 개발할 수 있습니다.' },
        { group: 'back', name: 'Node.js', icon: './img/no.png',
            desc: 'Express 프레임워크를 활용하여 GET, POST, DELETE, PUT 요청을 처리하고, 간단한 방명록 등의 기능을 구현할 수 있습니다.' },
        { group: 'back', name: 'GCP', icon: './img/go.png',
            desc: 'GCP(구글 클라우드 플랫폼)를 활용하여 작성한 프로젝트를 클라우드 환경에 배포할 수 있습니다.' },
        { group: 'back', name: 'MySQL', icon: './img/my.png',
            desc: 'SELECT(JOIN 포함), INSERT, UPDATE, DELETE 등의 SQL 문으로 데이터베이스를 설계하고, 효율적인 데이터 모델링과 쿼리 개선을 수행할 수 있습니다.' },
        { group: 'etc', name: 'Git & GitHub', icon: './img/gi.png',
            desc: 'Git을 사용하여 코드 이력을 체계적으로 관리하고, GitHub를 활용한 협업 및 버전 관리를 진행할 수 있습니다.' },
        { group: 'etc', name: 'Figma', icon: './img/fi.png',
            desc: '피그마를 활용해 협업을 진행한 적이 있으며, 디자인 작업을 위해 사용할 수 있습니다.' },
        { group: 'etc', name: 'Adobe', icon: './img/ad.png',
            desc: 'Photoshop, Illustrator, After Effects, XD 등 Adobe 프로그램을 활용할 수 있습니다.' }
    ],

    // 프로젝트 분류
    projectTypes: [
        { id: 'all', label: 'All' },
        { id: 'personal', label: 'Personal' },
        { id: 'team', label: 'Team' },
        { id: 'mini', label: 'Mini' }
    ],

    // thumb: 카드 썸네일 / preview: 상세 보기에서 자동 스크롤되는 긴 이미지
    projects: [
        { id: 'moLmoL', type: 'personal', name: 'moLmoL', summary: 'PC버전 / 향수 쇼핑몰',
            tags: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PC', 'Git'],
            thumb: './img/proMain1.jpg', preview: './img/molmolMainpages.jpg',
            text1: '다양한 종류의 향수를 판매하는 사이트입니다.',
            text2: '<b>JavaScript와 jQuery</b>를 주로 사용하였으며, 다양한 이벤트 구현에 중점을 두고 구현했습니다. CSS는 형지엘리트사 홈페이지를 참고하였습니다.',
            link: 'https://hanyisy.github.io/MolMol/' },
        { id: 'woodin', type: 'personal', name: 'WOODIN', summary: '반응형 / 카피 사이트',
            tags: ['HTML', 'CSS', 'JavaScript', '반응형', 'Grid', 'Git'],
            thumb: './img/proMain2.jpg', preview: './img/woodinPages.jpg',
            text1: '가구 브랜드 우딘의 사이트를 카피하였습니다.',
            text2: '<b>Grid</b>를 활용한 레이아웃과 <b>반응형</b>을 중점으로 두고 제작한 사이트로, 주로 CSS와 JavaScript를 중심으로 제작되었습니다.',
            link: 'https://hanyisy.github.io/woodinCopypage/' },
        { id: 'onnuri', type: 'team', name: 'OnNuri', summary: '반응형 / 팀 프로젝트 / 한국 관광 사이트',
            tags: ['HTML', 'CSS', 'JavaScript', 'jQuery', '반응형', '팀프로젝트', '공공API', 'Canvas', 'Git'],
            thumb: './img/proMain3.jpg', preview: './img/onnuri0.jpg',
            text1: '한국의 사계절과 관광지 등을 소개하는 홈페이지입니다.',
            text2: '<b>팀 프로젝트</b>로 제작된 사이트입니다. <b>공공 API와 Canvas, Git</b> 등을 활용하였으며 반응형과 API 활용 등을 중점으로 제작되었습니다.',
            link: 'https://sonjongmin1.github.io/TouristWebsite/index.html' },
        { id: 'neulNeuru', type: 'personal', name: 'NeulNeuru', summary: 'PC버전 / 도서 판매 사이트',
            tags: ['HTML', 'CSS', 'JavaScript', 'React', '공공API', 'Git'],
            thumb: './img/proMain4.jpg', preview: './img/neulPage.jpg',
            text1: '도서 판매 홈페이지입니다.',
            text2: '<b>React</b>에 중점을 두고 제작한 사이트로 <b>Sass</b>를 함께 사용하였습니다.',
            link: 'https://hanyisy.github.io/books/' },
        { id: 'weather', type: 'mini', name: 'Weather Page', summary: 'PC버전 / 날씨 및 기온 검색 페이지',
            tags: ['HTML', 'CSS', 'JavaScript', '공공API', 'Git'],
            thumb: './img/weatherpage.jpg', preview: './img/weathers.jpg',
            text1: '현재 날씨 및 기온을 확인할 수 있는 페이지입니다.',
            text2: '<b>공공 API</b>를 활용하여 실시간 기상 및 기온을 확인할 수 있도록 했습니다. 검색창에 원하는 지역을 <b>영어로</b> 작성하여 검색하면 그 지역의 날씨 및 기온도 확인이 가능합니다.',
            link: 'https://hanyisy.github.io/study/weatherPage.html' },
        { id: 'relog', type: 'personal', name: 'Relog', summary: '반응형 / 여행정보 공유 및 관광 사이트',
            tags: ['HTML', 'CSS', 'JavaScript', '반응형', 'Git'],
            thumb: './img/relogMain.jpg', preview: './img/relogs.jpg',
            text1: '여행 기록을 올리거나 관련 상품 또는 서비스를 구매할 수 있는 사이트입니다.',
            text2: '<b>로그인 및 회원가입 페이지</b>를 구현하였으며, CSS와 JavaScript 중점으로 구현하였습니다.',
            link: 'https://hanyisy.github.io/reLog/' },
        { id: 'cremaked', type: 'personal', name: 'CreMaked', summary: 'PC버전 / Java와 GCP를 활용한 사이트',
            tags: ['HTML', 'CSS', 'JavaScript', 'Java', 'JSP', 'GCP'],
            thumb: './img/cremakedMain.png', preview: './img/cremaked.png',
            text1: '홈페이지 제작 판매 사이트입니다.',
            text2: '<b>Java, JSP</b>를 활용하였으며, <b>GCP(구글 클라우드)</b>를 활용하여 방명록을 구현했습니다.',
            link: 'https://mres-911615709088.us-central1.run.app' },
        { id: 'molro', type: 'personal', name: 'MolRo', summary: 'PC버전 / 전자 제품 판매 사이트',
            tags: ['HTML', 'CSS', 'JavaScript', 'Vue', 'Git'],
            thumb: './img/molroMain.png', preview: './img/molro.png',
            text1: '전자 제품 판매 사이트입니다.',
            text2: '<b>Vue</b>를 활용하였으며, 상품을 <b>카트에 담고 삭제</b>할 수 있는 기능을 구현했습니다.',
            link: 'https://hanyisy.github.io/shops/#/' }
    ]
};
