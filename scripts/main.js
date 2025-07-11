document.addEventListener('DOMContentLoaded', function () {
     if (!isDeveloperMode) {
          keyBlocked();
          preventDefault();
          startSection1();
     }
     waitMe(true);
     login();
     loggedUserInfo(() => {
     });
});

$(document).ready(function () {
     AOS.init({});
     $('a.smooth-scroll').click(function (event) {
          if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

               var target = $(this.hash);
               target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
               if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                         scrollTop: target.offset().top
                    }, 1000, function () {
                         var $target = $(target);
                         $target.focus();
                         if ($target.is(":focus")) {
                              return false;
                         } else {
                              $target.attr('tabindex', '-1');
                              $target.focus();
                         };
                    });
               }
          }
     });
     $('.nav-item').click(function (arg) {
          $('.navbar-toggler').click();
     })
});

document.getElementById('contactForm').addEventListener('submit', function (event) {
     event.preventDefault();

     const nameLocal = document.getElementsByName('name')[0].value;
     const subjectLocal = document.getElementsByName('Subject')[0].value;
     const emailLocal = document.getElementsByName('_replyto')[0].value;
     const messageLocal = document.getElementsByName('message')[0].value;

     const data = {
          name: nameLocal,
          subject: subjectLocal,
          email: emailLocal,
          message: messageLocal,
          createDate: new Date().toLocaleDateString('tr-TR', { weekday: "short", year: "numeric", month: "short", day: "numeric" }) + " " + new Date().toLocaleTimeString('tr-TR'),
          senderInfo: senderInfo
     };

     sendMail(data);
});

function sendMail(data) {
     const apiUrl = RequestUrl.API_SEND_MAIL;

     const queryParams = new URLSearchParams({
          name: data.name,
          subject: data.subject,
          email: data.email,
          message: data.message,
          createDate: data.createDate,
          senderInfo: JSON.stringify(data.senderInfo),
          "x-user-token": token
     }).toString();

     const url = `${apiUrl}?${queryParams}`;

     GenericRequestService.request({
          url: url,
          method: 'GET',
          callback: (data) => {
               const x = document.getElementById("snackbar");
               x.className = "show";
               x.style.color = "white";
               x.style.backgroundColor = "green";
               x.innerText = "Mailiniz başarıyla gönderildi.";
               setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);

               document.getElementsByName('name')[0].value = '';
               document.getElementsByName('Subject')[0].value = '';
               document.getElementsByName('_replyto')[0].value = '';
               document.getElementsByName('message')[0].value = '';
          },
          errorCallback: (error) => {
               const x = document.getElementById("snackbar");
               x.style.color = "white";
               x.style.backgroundColor = "red";
               x.innerText = "Mail gönderimi başarısız oldu";
               x.innerText += error
               x.className = "show";
               setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);
          }
     });
}

function login() {
     GenericRequestService.request({
          url: RequestUrl.API_GET_COUNTER,
          method: 'GET',
          callback: (data) => {
               if (data.data === false) {
                    hideSite();
                    showCaptcha();
               } else {
                    showSite();
                    hideCaptcha();
                    getCvData((response) => {
                         cvData = response;
                         about = getCvResponseDetail("about");
                         follow = getCvResponseDetail("follows");
                         skill = getCvResponseDetail("skills");
                         project = getCvResponseDetail("project");
                         experience = getCvResponseDetail("experience");
                         //reference = getCvResponseDetail("reference");
                         setFollow();
                         setAbout();
                         setSkill();
                         setProject();
                         setExperience();
                         //setReference();
                         setContactMeInfo();
                    });
               }
               document.getElementById("totalVisitors").innerHTML = data.data;
          },
          errorCallback: (error) => {
               console.error('Hata:', error);
          },
     });
}

function getCvResponseDetail(key) {
     if (!cvData || !Array.isArray(cvData)) {
         console.error("cvData uygun bir dizi değil veya tanımlı değil.");
         return null;
     }
     const item = cvData.find(i => i.key === key);
     return item?.data?.data || item?.data || [];
 }

function startSection1() {
     let devToolsOpen = false;

     function redirectToLinkedIn() {
          window.location.href = 'https://www.linkedin.com/in/muratonay1/';
     }

     function checkDevTools() {
          const widthThreshold = window.outerWidth - window.innerWidth > 160;
          const heightThreshold = window.outerHeight - window.innerHeight > 160;

          if (widthThreshold || heightThreshold) {
               console.log('Geliştirici araçları açık!');
               devToolsOpen = true;

               setTimeout(function () {
                    if (devToolsOpen) {
                         console.log('1 saniye içinde geliştirici araçları kapatılmadı, yönlendiriliyor...');
                         redirectToLinkedIn();
                    }
               }, 1);
          } else {
               console.log('Geliştirici araçları kapalı.');
               devToolsOpen = false;
          }
     }
     function isMobileDevice() {
          return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
     }

     window.addEventListener('load', function () {
          checkDevTools();
     });

     window.addEventListener('resize', function () {
          checkDevTools();
     });

     function isMobileDevice() {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
     }

     function checkMobileDevTools() {
          if (isMobileDevice()) {
               if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    console.log('Mobil cihazda.');
                    if (window.innerWidth <= 600 && window.innerHeight <= 800) {
                         console.log('Geliştirici araçları muhtemelen kapalı.');
                         checkDevTools()
                    } else {
                         console.log('Geliştirici araçları açık gibi görünüyor.');
                         checkDevTools()
                    }
               }
          } else {
               console.log('Bu bir mobil cihaz değil.');
          }
     }
     window.addEventListener('load', checkMobileDevTools);
     window.addEventListener('resize', checkMobileDevTools);
}

function keyBlocked() {

     document.addEventListener('keydown', function (e) {
          if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) {
               e.preventDefault();
          }
          if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) {
               e.preventDefault();
          }
          if (e.keyCode === 123) {
               e.preventDefault();
          }
     });
}

function preventDefault() {
     document.addEventListener('contextmenu', function (e) {
          e.preventDefault();
     });
}

function hideSite() {
     document.querySelector(".page-content").hidden = true;
     document.querySelector(".footer").hidden = true;
     document.querySelector(".profile-page").hidden = true;
}

function showSite() {
     document.querySelector(".page-content").hidden = false;
     document.querySelector(".footer").hidden = false;
     document.querySelector(".profile-page").hidden = false;
}

function showCaptcha() {
     document.querySelector(".center").style.display = "flex";
}

function hideCaptcha() {
     document.querySelector(".center").style.display = "none";
}

document.getElementById('captchaForm').addEventListener('submit', function (event) {
     event.preventDefault();

     GenericRequestService.request({
          url: RequestUrl.API_VERIFY_CAPTCHA,
          method: 'POST',
          body: { captchaResponse: grecaptcha.getResponse() },
          callback: (data) => {
               if (data.data.success) {
                    hideCaptcha();
                    showSite();
                    login();
               }
          },
          errorCallback: (error) => {
               console.error('Hata:', error);
          },
     });
});