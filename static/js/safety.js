/* ===========================================================
    HomePick Safety
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeSafety();

});


/* ===========================================================
    초기화
=========================================================== */

function initializeSafety(){

    scoreAnimation();

    progressAnimation();

    counterAnimation();

    bindSearch();

    bindFilter();

}


/* ===========================================================
    검색
=========================================================== */

function bindSearch(){

    const form = document.querySelector(".search-box");

    const input = document.querySelector("#address");

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        const address = input.value.trim();

        if(address===""){

            alert("주소를 입력해주세요.");

            input.focus();

            return;

        }

        analyzeAddress(address);

    });

}


/* ===========================================================
    주소 분석
=========================================================== */

function analyzeAddress(address){

    console.log(address);

    loading(true);

    setTimeout(()=>{

        loading(false);

        createRandomResult();

    },1500);

}


/* ===========================================================
    로딩
=========================================================== */

function loading(state){

    const map=document.querySelector("#map");

    if(state){

        map.innerHTML=`

        <div class="d-flex
        justify-content-center
        align-items-center
        h-100">

            <div class="loading"></div>

        </div>

        `;

    }else{

        map.innerHTML="";

    }

}


/* ===========================================================
    랜덤 결과(임시)
=========================================================== */

function createRandomResult(){

    const score=Math.floor(Math.random()*20)+80;

    updateScore(score);

}


/* ===========================================================
    점수 변경
=========================================================== */

function updateScore(score){

    animateNumber(

        document.querySelector(".score-circle"),

        score

    );

}


/* ===========================================================
    점수 애니메이션
=========================================================== */

function scoreAnimation(){

    const score=document.querySelector(".score-circle");

    animateNumber(score,89);

}


/* ===========================================================
    숫자 증가
=========================================================== */

function animateNumber(target,end){

    let start=0;

    const speed=20;

    const timer=setInterval(()=>{

        start++;

        target.innerHTML=start;

        if(start>=end){

            clearInterval(timer);

        }

    },speed);

}

/* ===========================================================
    HomePick Safety
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeSafety();

});


/* ===========================================================
    초기화
=========================================================== */

function initializeSafety(){

    scoreAnimation();

    progressAnimation();

    counterAnimation();

    bindSearch();

    bindFilter();

}


/* ===========================================================
    검색
=========================================================== */

function bindSearch(){

    const form = document.querySelector(".search-box");

    const input = document.querySelector("#address");

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        const address = input.value.trim();

        if(address===""){

            alert("주소를 입력해주세요.");

            input.focus();

            return;

        }

        analyzeAddress(address);

    });

}


/* ===========================================================
    주소 분석
=========================================================== */

function analyzeAddress(address){

    console.log(address);

    loading(true);

    setTimeout(()=>{

        loading(false);

        createRandomResult();

    },1500);

}


/* ===========================================================
    로딩
=========================================================== */

function loading(state){

    const map=document.querySelector("#map");

    if(state){

        map.innerHTML=`

        <div class="d-flex
        justify-content-center
        align-items-center
        h-100">

            <div class="loading"></div>

        </div>

        `;

    }else{

        map.innerHTML="";

    }

}


/* ===========================================================
    랜덤 결과(임시)
=========================================================== */

function createRandomResult(){

    const score=Math.floor(Math.random()*20)+80;

    updateScore(score);

}


/* ===========================================================
    점수 변경
=========================================================== */

function updateScore(score){

    animateNumber(

        document.querySelector(".score-circle"),

        score

    );

}


/* ===========================================================
    점수 애니메이션
=========================================================== */

function scoreAnimation(){

    const score=document.querySelector(".score-circle");

    animateNumber(score,89);

}


/* ===========================================================
    숫자 증가
=========================================================== */

function animateNumber(target,end){

    let start=0;

    const speed=20;

    const timer=setInterval(()=>{

        start++;

        target.innerHTML=start;

        if(start>=end){

            clearInterval(timer);

        }

    },speed);

}

/* ===========================================================
    Layer Filter
=========================================================== */

function bindFilter(){

    const filters = document.querySelectorAll(".form-check-input");

    filters.forEach(filter=>{

        filter.addEventListener("change",()=>{

            const label =
                filter.parentElement.querySelector("label").innerText;

            toggleLayer(label,filter.checked);

        });

    });

}


/* ===========================================================
    지도 Layer 제어
=========================================================== */

function toggleLayer(name,state){

    console.log(name,state);

    /*
      Kakao Map 연결 시

      if(name==="CCTV"){
          cctvLayer.setMap(state ? map : null);
      }

      if(name==="비상벨"){
          bellLayer.setMap(state ? map : null);
      }

    */

}


/* ===========================================================
    최근 검색 저장
=========================================================== */

function saveRecentSearch(address){

    let list =
        JSON.parse(localStorage.getItem("recentAddress")) || [];

    list.unshift(address);

    list = [...new Set(list)];

    list = list.slice(0,5);

    localStorage.setItem(
        "recentAddress",
        JSON.stringify(list)
    );

}


/* ===========================================================
    최근 검색 출력
=========================================================== */

function loadRecentSearch(){

    const list =
        JSON.parse(localStorage.getItem("recentAddress")) || [];

    console.log("최근검색",list);

}


/* ===========================================================
    검색 수정
=========================================================== */

const oldAnalyze = analyzeAddress;

analyzeAddress = function(address){

    saveRecentSearch(address);

    loading(true);

    setTimeout(()=>{

        loading(false);

        createRandomResult();

        toast(address+" 분석이 완료되었습니다.");

        showMapMarker();

    },1500);

}


/* ===========================================================
    Marker Demo
=========================================================== */

function showMapMarker(){

    const map=document.querySelector("#map");

    map.innerHTML="";

    const colors=[
        "marker-danger",
        "marker-cctv",
        "marker-bell",
        "marker-police",
        "marker-women"
    ];

    for(let i=0;i<20;i++){

        const marker=document.createElement("div");

        marker.className="marker "+colors[
            Math.floor(Math.random()*colors.length)
        ];

        marker.style.left=Math.random()*95+"%";

        marker.style.top=Math.random()*90+"%";

        map.appendChild(marker);

    }

}


/* ===========================================================
    안전점수 계산
=========================================================== */

function calculateSafety(data){

    /*
        범죄주의 30%

        여성안전 20%

        CCTV 20%

        비상벨 15%

        치안시설 15%

    */

    const score =

        data.crime * 0.30 +

        data.women * 0.20 +

        data.cctv * 0.20 +

        data.bell * 0.15 +

        data.police * 0.15;

    return Math.round(score);

}


/* ===========================================================
    실제 데이터 적용 예시
=========================================================== */

function applySafetyData(data){

    const score = calculateSafety(data);

    updateScore(score);

    updateGrade(score);

    updateAI(score);

    updateProgress([

        data.crime,

        data.women,

        data.cctv,

        data.bell,

        data.police

    ]);

}


/* ===========================================================
    카드 등장 효과
=========================================================== */

function animateCards(){

    document
    .querySelectorAll(".card")
    .forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(30px)";

        setTimeout(()=>{

            card.style.transition=".6s";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*150);

    });

}


/* ===========================================================
    Enter Search
=========================================================== */

document
.querySelector("#address")
.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

        document
        .querySelector(".search-box")
        .dispatchEvent(new Event("submit"));

    }

});


/* ===========================================================
    최초 실행
=========================================================== */

animateCards();

loadRecentSearch();