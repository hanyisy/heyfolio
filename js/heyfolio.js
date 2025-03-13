document.addEventListener("DOMContentLoaded", function () {
    // open site ani
    let opens = document.querySelector('.opens');
    let opensm = document.querySelector('.opensm');
    let loadingText = document.querySelector('.lode');
    let loadingText2 = document.querySelector('.lodem');

    if (!opens || !loadingText) {
        console.error("로드할 요소를 찾을 수 없습니다.");
        return;
    }

    setTimeout(() => {
        document.querySelector('.opT1').style.opacity = 1;
        setTimeout(() => {
            document.querySelector('.opT2').style.opacity = 1;
        }, 1000);
        document.querySelector('.opT1m').style.opacity = 1;
        setTimeout(() => {
            document.querySelector('.opT2m').style.opacity = 1;
        }, 1000);
    }, 200);

    for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
            loadingText.innerHTML = "LOADING .... " + i + "%";
            loadingText2.innerHTML = "LOADING .... " + i + "%";
        }, i * 35);
    }

    setTimeout(() => {
        setTimeout(() => {
            opens.style.display = "none";
            opensm.style.display = "none";
        }, 500);
        window.scrollTo({ top: 0 });
        opens.style.opacity = 0;
        openm.style.opacity = 0;
    }, 4000);
});


// 페이지 스크롤
document.addEventListener("wheel", (event) => {
    event.preventDefault(); // 기본 스크롤 방지
    const sections = document.querySelectorAll(".scrollp");
    let pagesIndex = Math.round(window.scrollY / window.innerHeight);

    if (sections.length === 0) {
        console.error("섹션을 찾을 수 없습니다.");
        return;
    }

    if (event.deltaY > 0) {
        // 아래로 스크롤
        if (pagesIndex < sections.length - 1) {
            window.scrollTo({ 
                top: (pagesIndex + 1) * window.innerHeight, 
                behavior: "smooth" 
            });
        }
    } else {
        // 위로 스크롤
        if (pagesIndex > 0) {
            window.scrollTo({ 
                top: (pagesIndex - 1) * window.innerHeight, 
                behavior: "smooth" 
            });
        }
    }
}, { passive: false });

//top 버튼
document.querySelector('.topBtn').addEventListener('click',function(){
    window.scrollTo({ 
        top: 0, 
        behavior: "smooth" 
    });
})

//gagebar
document.addEventListener("scroll", function () {
    let barBox = document.querySelector(".barBox");
    let gages = document.querySelector(".gages");

    if (!barBox || !gages) return;

    let scrollTop = window.scrollY;
    let windowHeight = window.innerHeight;
    let totalHeight = document.body.scrollHeight - windowHeight;

    if (scrollTop >= windowHeight) {
        barBox.style.display = "block";
        setTimeout(() => {
            barBox.style.opacity = 1;
        }, 100);
    } else {
        barBox.style.display = "none";
        barBox.style.opacity = 0;
    }

    let scrollPercentage = (scrollTop / totalHeight) * 100;
    gages.style.height = scrollPercentage + "%";
});



// about page
let moveAbout = document.querySelectorAll(".moveAbout");

let mainLbox = document.querySelector('.mainLbox');
let mainRbox = document.querySelector('.mainRbox')
let lboxUn = document.querySelector('.lboxUn');
let lboxUp = document.querySelector('.lboxUp');
let rboxUn = document.querySelector('.rboxUn');
let myImg = document.querySelector('.myImg');
let myImg1 = document.getElementById('myimg1');
let myImg2 = document.getElementById('myimg2');

let remo = document.querySelector('.remo');
let logBox = document.querySelectorAll('.rboxUn>div');

let aboutB =false;

let aboutprofile =document.querySelector('.aboutprofile');

moveAbout.forEach(function(element) {
    element.addEventListener("click", function() {
        if(!aboutB){
            aboutB=true;
            mainLbox.style.width='30%';
            mainRbox.style.width='65%';
            rboxUn.style.width='95%';
            myImg.classList.add('on');
            myImg1.style.display='none';
            myImg2.style.display='block';
            remo.style.display='none';
            aboutprofile.style.display='block';
            for(let i=0; i<logBox.length;i++){
                setTimeout(() => {
                    logBox[i].style.opacity='1';
                }, (i+1)*300);
            }
        }else{
            aboutB=false;
            logBox.forEach(item => {
                item.style.opacity="0";
            });
            mainLbox.style.width='90%';
            mainRbox.style.width='10%';
            rboxUn.style.width='0%';
            myImg.classList.remove('on');
            myImg1.style.display='block';
            myImg2.style.display='none';
            remo.style.display='block';
            aboutprofile.style.display='none';
        }
    });
});

document.querySelector('.homes').addEventListener("click", function() {
    aboutB=false;
    mainLbox.style.width='90%';
    mainRbox.style.width='10%';
    rboxUn.style.width='0%';
    remo.style.display='block';
    myImg1.style.display='block';
    myImg2.style.display='none';
    myImg.classList.remove('on');
    aboutprofile.style.display='none';
});



//click keyword


function shows(id) {
    let skillbtn = document.querySelectorAll('.skillNav>div'); // 상단 버튼들
    let skillList = document.querySelectorAll('.skillList>div'); // 전체 리스트
    let ids = document.getElementById(id); // 클릭한 리스트의 ID 가져오기

    // 모든 버튼에서 'ons' 제거 후 클릭한 버튼에 추가
    skillbtn.forEach(item => item.classList.remove("ons"));
    document.querySelector(`[onclick="shows('${id}')"]`).classList.add("ons");

    // 모든 리스트에서 'ons' 제거하여 숨김 처리
    skillList.forEach(item => {
        item.classList.remove('ons');
        item.querySelectorAll('div').forEach(skill => {
            skill.classList.remove('ups'); // 모든 리스트 아이템 초기화
        });
    });

    // 선택된 리스트만 보이도록 설정
    if (ids) {
        ids.classList.add("ons"); // 리스트 보이기

        // 리스트 안의 개별 항목들을 차례로 나타나게 함
        let showlists = ids.querySelectorAll('div');
        showlists.forEach((item, index) => {
            item.style.transition = 'none'; // 초기화
            item.classList.remove('ups');

            setTimeout(() => {
                setTimeout(() => {
                    item.style.transition = '0.3s';
                    item.classList.add('ups');
                }, index * 100); // 100ms 간격으로 나타나도록 설정
            }, 200);
        });
    }
}

//porject list
function projectShow(projectL){
    let projectBoxs = document.querySelectorAll('.projectB');
    let projectLs = document.querySelectorAll(`#${projectL}`);
    let projectName = document.querySelector('#projectName');
    let projectres = document.querySelector('#projectres');
    let closeProject = document.getElementById('closeProject');
    let projectListBoxs = document.querySelector('#projectListBoxs');
    let projectBox = document.getElementById('projectBox');
    console.log(projectL)

    closeProject.style.display='none';
    projectListBoxs.style.display='flex';
    projectBox.style.display='none';

    projectBoxs.forEach(item=>{
        item.style.opacity=0;
        setTimeout(() => {
            item.style.display='none'
        }, 100);
    })
    

    projectLs.forEach(item=>{
        setTimeout(() => {
            item.style.display='block';
            setTimeout(() => {
                item.style.opacity='1';
            }, 100);
        }, 200);
    });

    if(projectL=="all"){
        projectBoxs.forEach(item=>{
            setTimeout(() => {
                item.style.display='block';
                setTimeout(() => {
                    item.style.opacity='1';
                }, 100);
            }, 200);
        });
        projectName.textContent='All Project';
        projectres.textContent='모든 프로젝트 리스트 입니다.';
    }else if(projectL=='personal'){
        projectName.textContent='Personal Project';
        projectres.textContent='개인 프로젝트 리스트 입니다.';
    }else if(projectL=='team'){
        projectName.textContent='Team Project';
        projectres.textContent='팀 프로젝트 리스트 입니다.';
    }else if(projectL=='mini'){
        projectName.textContent='Mini Project';
        projectres.textContent='작은 프로젝트들의 모음 입니다.';
    }

    $('#closeProject').click(()=>{
        projectShow('all');
    })

    //porject Boxs
    window.projectGo=function(project){
        let closeProject = document.getElementById('closeProject');
        let projectListBoxs = document.querySelector('#projectListBoxs');
        let projectBox = document.getElementById('projectBox');
        let projectName = document.querySelector('#projectName');
        let projectres = document.querySelector('#projectres');
        closeProject.style.display='block'
        let projects = [
            { id:'moLmoL',name:'moLmoL',tags:'#HTML #CSS #Javascript #Jquery #PC',minit:'PC버전 / 향수 쇼핑몰',
                text1:'다양한 종류의 향수를 판매하는 사이트 입니다.',text2:'javascript와 jquery를 주로 사용하였으며, 다양한 이벤트 구현에 중점을 두고 구현했습니다.css는 형지엘리트사 홈페이지를 참고 하였습니다.',
                page:'../subProject/molmol/molmol.html',gitpage:'https//ddd',
                img:'./img/molmolMainpages.png'
            },
            { id:'woodin',name:'WOODIN',tags:'#HTML #CSS #Javascript #반응형 #Grid',minit:'반응형 / 카피 사이트',
                text1:'가구 브랜드 우딘의 사이트를 카피 하였습니다.',text2:'grid를 활용한 레이아웃과 반응형을 중점으로 두고 제작한 사이트로, 주로 css와 janascript를 중심으로 제작되었습니다.',
                page:'../subProject/woodin/woodin.html',gitpage:'https//ddd',
                img:'./img/woodinPages.png'
            },
            { id:'onnuri',name:'OnNuri',tags:'#HTML #CSS #Javascript #Jquery #반응형 #팀프로젝트 #공공API #canvas',minit:'반응형 / 팀 프로젝트 / 한국 관광 사이트',
                text1:'한국의 사계절과 관광지등을 소개하는 홈페이지 입니다.',text2:'팀 프로젝트로 제작된 사이트입니다. 공공api와 canvas, git등을 활용하였으며 반응형과 api활용등을 중점으로 제작되었습니다.',
                page:'https://sonjongmin1.github.io/TouristWebsite/index.html',gitpage:'https//ddd',
                img:'./img/onnuriPage.png'
            },
            { id:'neulNeuru',name:'NeulNeuru',tags:'#HTML #CSS #Javascript #React #공공API',minit:'PC버전 / 도서 판매사이트',
                text1:'도서 판매 홈페이지 입니다.',text2:'React에 중점을 두고 제작한 사이트로 sass를 함께 사용하였습니다.',
                page:'https://hanyisy.github.io/books/',gitpage:'https//ddd',
                img:'./img/neulPage.png'
            },
            { id:'weather',name:'weather Page',tags:'#HTML #CSS #Javascript #공공API',minit:'PC버전 / 날씨 및 기온 검색 페이지',
                text1:'현재 날씨 및 기온을 확인할 수 있는 페이지 입니다.',text2:'공공API를 활용하여 실시간 기상 및 기온을 확인할수 있도록 했습니다. 검색창에 원하는 지역을 영어로 작성하여 검색하면 그 지역의 날씨 및 기온도 확인이 가능합니다.',
                page:'https://hanyisy.github.io/study/weatherPage.html',gitpage:'https//ddd',
                img:'./img/weatherPages.png'
            },
            { id:'relog',name:'Relog',tags:'#HTML #CSS #Javascript #반응형',minit:'반응형 / 여행정보 공유 및 관광 사이트',
                text1:'여행기록을 올리거나 관련 상품 또는 서비스를 구매할 수 있는 사이트 입니다.',text2:'로그인 및 회원가입 페이지를 구연하였으며, css와 JavaScript 중점으로 구현하였습니다.',
                page:'../subProject/relog/relog.html',gitpage:'https//ddd',
                img:'./img/relogPage.png'
            }
        ];

        projectListBoxs.style.display='none';
        projectBox.style.display='flex';
        projectBox.innerHTML='';

        projects.forEach(item =>{
            if(item.id == project){
                //이미지 넣기+자동 스크롤 추가
                let lDiv = document.createElement('div');
                let limg = document.createElement('img');
                lDiv.classList.add('imgflame');
                limg.classList.add('scrollimg');
                limg.src=item.img;

                lDiv.addEventListener('mouseenter', () => {
                    const scrollHeight = limg.scrollHeight - lDiv.clientHeight;
                    limg.style.transform = `translateY(-${scrollHeight}px)`;
                });
        
                lDiv.addEventListener('mouseleave', () => {
                    limg.style.transform = `translateY(0)`;
                });

                //내용 넣기
                let rDiv = document.createElement('div');//작업 가능 영역
                let rTopDiv = document.createElement('div');
                let rMidDiv = document.createElement('div');
                let rBotDiv = document.createElement('div');

                projectName.textContent=item.id;
                projectres.textContent=item.tags;
                rDiv.classList.add('rDiv');
                rTopDiv.innerHTML=`<div>${item.name}</div><div>${item.minit}</div>`;
                rMidDiv.innerHTML=`<div>${item.text1}</div><div>${item.text2}</div>`;
                rBotDiv.innerHTML=`<div><a href="${item.page}" target="blank">홈페이지 ></div>`;
                // rBotDiv.innerHTML=`<div><a href="${item.page}" target="blank">홈페이지 ></div><div><a href="${item.gitpage}" target="blank">GitHub ></div>`;


                //소속 넣기
                projectBox.appendChild(lDiv);
                projectBox.appendChild(rDiv);
                lDiv.appendChild(limg);
                rDiv.appendChild(rTopDiv);
                rDiv.appendChild(rMidDiv);
                rDiv.appendChild(rBotDiv);
            }
        })
    }

}

// 모바일 버전
let menuMo = document.querySelector('.menuMo');
let barMo = document.querySelector('.barMo');
let fBox = document.querySelector('.fBox');
let sBox = document.querySelector('.sBox');
document.getElementById('goMenu').addEventListener('click',()=>{
    menuMo.style.display='block';
    setTimeout(() => {
        menuMo.style.opacity= '1';
        barMo.classList.add('mov');
    }, 100);
});
document.getElementById('outMenu').addEventListener('click',()=>{
    barMo.classList.remove('mov');
    menuMo.style.opacity= '0';
    setTimeout(() => {
        menuMo.style.display='none';
    }, 300);
});

document.getElementById('goabout').addEventListener('click',()=>{
    document.querySelector('.aboutBoxMo').style.height='18rem';
    document.getElementById('goabout').style.display='none';
    document.getElementById('outabout').style.display='block';
    fBox.style.opacity='0';
    sBox.style.display='block';
    setTimeout(() => {
        fBox.style.display='none';
        sBox.style.opacity='1';
    }, 100);
});
document.getElementById('outabout').addEventListener('click',()=>{
    document.querySelector('.aboutBoxMo').style.height='0rem';
    document.getElementById('goabout').style.display='block';
    document.getElementById('outabout').style.display='none';
    fBox.style.display='block';
    sBox.style.opacity='0';
    setTimeout(() => {
        fBox.style.opacity='1';
        sBox.style.display='none';
    }, 100);
});

//click keyword


function showm(id) {
    let skillbtn = document.querySelectorAll('.skillNavm > div'); // 상단 버튼들
    let skillList = document.querySelectorAll('.skillListm > div'); // 전체 리스트
    let ids = document.getElementById(id); // 클릭한 리스트의 ID 가져오기

    // 모든 리스트에서 'ons' 제거하여 숨김 처리
    skillList.forEach(item => {
        item.classList.remove('ons');
        item.querySelectorAll('div').forEach(skill => {
            skill.classList.remove('ups'); // 모든 리스트 아이템 초기화
        });
    });



    // 모든 버튼에서 'ons' 제거 후 클릭한 버튼에 추가
    skillbtn.forEach(item => item.classList.remove("ons"));
    document.querySelector(`.skillNavm > div[onclick="showm('${id}')"]`).classList.add("ons");


    // 선택된 리스트만 보이도록 설정
    if (ids) {
        ids.classList.add("ons"); // 리스트 보이기

        // 리스트 안의 개별 항목들을 차례로 나타나게 함
        let showlists = ids.querySelectorAll('div');
        showlists.forEach((item, index) => {
            item.style.transition = 'none'; // 초기화
            item.classList.remove('ups');

            setTimeout(() => {
                setTimeout(() => {
                    item.style.transition = '0.3s';
                    item.classList.add('ups');
                }, index * 100); // 100ms 간격으로 나타나도록 설정
            }, 200);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let card = document.querySelectorAll('.inBox');
        
    card.forEach( item => {
        item.addEventListener('click', () => {
            item.classList.toggle('flipped'); // 클래스를 추가/제거하여 뒤집기
        });
    })
});


// 방명록 쓰러가기
let gowrite = document.querySelector('.gowrite');
gowrite.addEventListener('click',()=>{
    document.querySelector('.guestoutbox').style.display='flex';
});

//글쓰기창 보이기+숨기기기
document.querySelector(".writeB").addEventListener("click", function () {
    let guestoutbox = document.querySelector(".guestoutbox");

    if (window.innerWidth <= 768) {
        guestoutbox.style.display = "none";
    }
});

document.getElementById('closeWrite').addEventListener("click",()=>{
    document.querySelector(".guestoutbox").style.display='none'
})

//화면 크기에 따른 처리
window.addEventListener("resize", function () {
    let guestoutbox = document.querySelector(".guestoutbox");

    if (window.innerWidth > 768) {
        guestoutbox.style.display = "block"; // 블록을 보이게 함
    } else {
        guestoutbox.style.display = "none"; // 다시 숨김
    }
});
