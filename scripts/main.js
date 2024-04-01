let isDeveloperMode = true;

document.addEventListener('DOMContentLoaded', function () {
     if (!isDeveloperMode) {
          keyBlocked();
          preventDefault();
          startSection1();
     }

     waitMe(true);

     loggedUserInfo(() => {
          login();
     });
});

$(document).ready(function () {
     AOS.init({

     });

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
     var nameLocal = document.getElementsByName('name')[0].value;
     var subjectLocal = document.getElementsByName('Subject')[0].value;
     var emailLocal = document.getElementsByName('_replyto')[0].value;
     var messageLocal = document.getElementsByName('message')[0].value;

     var data = {
          "name": nameLocal,
          "subject": subjectLocal,
          "email": emailLocal,
          "message": messageLocal,
          "createDate": new Date().toLocaleDateString('tr-TR', { weekday: "short", year: "numeric", month: "short", day: "numeric" }) + " " + new Date().toLocaleTimeString('tr-TR'),
          "senderInfo": senderInfo
     };

     const apiUrl = 'https://muratonay.com.tr/api/api-send-mail';
     const userToken = '65d78580994151d94460ea1f';

     const name = encodeURIComponent(data.name);
     const subject = encodeURIComponent(data.subject);
     const email = encodeURIComponent(data.email);
     const message = encodeURIComponent(data.message);
     const createDate = encodeURIComponent(data.createDate);
     const senderInfoRemote = encodeURIComponent(JSON.stringify(data.senderInfo));

     const url = `${apiUrl}?name=${name}&subject=${subject}&email=${email}&message=${message}&createDate=${createDate}&senderInfo=${senderInfoRemote}&x-user-token=${userToken}`;

     const headers = new Headers();
     headers.append('x-user-token', userToken);

     // İstek Yapılandırması
     const request = new Request(url, {
          method: 'GET',
          headers: headers
     });
     // API'ye GET İsteği Gönderme
     fetch(request)
          .then(response => {
               if (!response.ok) {
                    throw new Error('Network response was not ok');
               }
               return response.json();
          })
          .then(data => {
               var x = document.getElementById("snackbar");
               x.className = "show";
               setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
               document.getElementsByName('name')[0].value = '';
               document.getElementsByName('Subject')[0].value = '';
               document.getElementsByName('_replyto')[0].value = '';
               document.getElementsByName('message')[0].value = '';
          })
          .catch(error => {
               console.error('Hata:', error);
          });

});

function login() {
     const apiUrl = 'https://muratonay.com.tr/api/api-get-counter';
     const userToken = '65d78580994151d94460ea1f';

     // Başlık (Header) Oluşturma
     const headers = new Headers();
     headers.append('x-user-token', userToken);

     // İstek Yapılandırması
     const request = new Request(apiUrl, {
          method: 'GET',
          headers: headers,
     });

     // API'ye İstek Gönderme
     fetch(request)
          .then(response => {
               if (!response.ok) {
                    throw new Error('Network response was not ok');
               }
               return response.json();
          })
          .then(data => {
               if (data.data == false) {
                    hideSite();
                    showCaptcha();
                    waitMe(false);
               }
               else {
                    showSite();
                    hideCaptcha();
                    getCvData((response) => {
                         about = response.filter(i => i.key == "about")[0].data;
                         follow = response.filter(i => i.key == "follows")[0].data.data;
                         skill = response.filter(i => i.key == "skills")[0].data.data;
                         project = response.filter(i => i.key == "project")[0].data.data;
                         experience = response.filter(i => i.key == "experience")[0].data.data;
                         setFollow();
                         setAbout();
                         setSkill();
                         setProject();
                         setExperience();
                         setContactMeInfo();
                         waitMe(false);
                    })
               }
               document.getElementById("totalVisitors").innerHTML = data.data;
          })
          .catch(error => {
               console.error('Hata:', error);
          });
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
                    } else {
                         console.log('Geliştirici araçları açık gibi görünüyor.');
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
          // Ctrl + Shift + I (Windows/Linux)
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

     const captchaResponse = grecaptcha.getResponse();

     const apiUrl = 'https://muratonay.com.tr/api/api-verify-captcha';

     const userToken = '65d78580994151d94460ea1f';

     fetch(apiUrl, {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
               'x-user-token': userToken
          },
          body: JSON.stringify({ captchaResponse: captchaResponse })
     })
          .then(response => response.json())
          .then(data => {
               if (data.data.success) {
                    hideCaptcha();
                    showSite();
                    login();
               }
          })
          .catch(error => {
               console.error('Hata:', error);
          });
});