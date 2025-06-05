$(document).ready(function () {

   $("#header").load("header.html", function () {
   });

   $("#nav").load("menu.html", function () {
      initNavScript();
  });

   $("#footer").load("footer.html", function () {
   });
})


    // 네비게이션 스크립트 실행을 위한 초기 진입함수
    //nav 선택자로 전달가능 
    function initNavScript(containerSelector) {
        //containerSeletor엔 nav-wrap가 들어감
        const container = document.querySelector(containerSelector);

        function bindDepth1Events() {
            container.querySelectorAll(".depth1-wrap").forEach((depth1) => {
                depth1.addEventListener("click", () => toggleDepth1(depth1));
            });
        }

        function toggleDepth1(element) {
            const isActive = element.classList.contains("active");
            const menuId = element.dataset.menu;

            container.querySelectorAll(".depth1-wrap").forEach((el) => {
                el.classList.remove("active");
                // el.nextElementSibling: el 다음 형제요소를 의미
                // 다음 형재 요소가 있으면 open클래스를 지워라는 뜻
                el.nextElementSibling?.classList.remove("open");
            });

            if (!isActive) {
                element.classList.add("active");
                element.nextElementSibling?.classList.add("open");

                if (menuId) activateClosedMenu(menuId);
            }
        }

        function bindDepth2Events() {
            container.querySelectorAll(".depth2-text").forEach((depth2) => {
                depth2.addEventListener("click", (e) => {
                    e.stopPropagation();
                    toggleDepth2(depth2);
                });
            });
        }

        function toggleDepth2(element) {
            const parentWrap = element.closest(".depth2-wrap");
            const isActive = element.classList.contains("active");

            parentWrap?.querySelectorAll(".depth2-text").forEach((el) => {
                el.classList.remove("active");
                el.nextElementSibling?.classList.remove("open");
            });

            if (!isActive) {
                element.classList.add("active");
                element.nextElementSibling?.classList.add("open");
            }
        }

        function bindDepth3Events() {
            container.querySelectorAll(".depth3-text a").forEach((link) => {
                link.addEventListener("click", () => {
                    const menuId = link.closest(".depth3-wrap")?.dataset.menu;
                    if (menuId) activateClosedMenu(menuId);
                });
            });
        }

        // 실행
        bindDepth1Events();
        bindDepth2Events();
        bindDepth3Events();
    }
    initNavScript(".nav-wrap"); // 다른 페이지에 커스텀 nav 적용 가능


    // 클래스들을 제거함
    function resetMenu(container) {
        container.querySelectorAll('.depth1-wrap').forEach(el => el.classList.remove('active'));
        container.querySelectorAll('.depth2.text').forEach(el => el.classList.remove('active'));
        container.querySelectorAll('.depth2-wrap, .depth3-wrap').forEach(el => el.classList.remove('open'));

    }


