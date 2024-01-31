// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function () {
     AOS.init({

     });

     // Smooth scroll for links with hashes
     $('a.smooth-scroll').click(function (event) {
          // On-page links
          if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

               // Figure out element to scroll to
               var target = $(this.hash);
               target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
               // Does a scroll target exist?
               if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                         scrollTop: target.offset().top
                    }, 1000, function () {
                         // Callback after animation
                         // Must change focus!
                         var $target = $(target);
                         $target.focus();
                         if ($target.is(":focus")) { // Checking if the target was focused
                              return false;
                         } else {
                              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                              $target.focus(); // Set focus again
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
     // Form submit olduğunda bu işlev çalışır

     // Eğer bir sayfaya yönlendirme yapmak istiyorsanız, aşağıdaki satırı kullanabilirsiniz
     // window.location.href = 'yönlenecek_sayfa.html';

     // Başarılı submiti konsola yazdırabilir veya başka bir işlem gerçekleştirebilirsiniz
     var name = document.getElementsByName('name')[0].value;
     var subject = document.getElementsByName('Subject')[0].value;
     var email = document.getElementsByName('_replyto')[0].value;
     var message = document.getElementsByName('message')[0].value;

     var data = {
          "name:": name,
          "subject:": subject,
          "email:": email,
          "message": message,
          "createDate": new Date().toLocaleDateString('tr-TR', { weekday: "short", year: "numeric", month: "short", day: "numeric" }) + " " + new Date().toLocaleTimeString('tr-TR'),
          "senderInfo": senderInfo
     };

     firebase.database().ref("senderMails/").push().set(data, error => {
          if (error) {
               console.log(error);
          }
          else {
               // Get the snackbar DIV
               var x = document.getElementById("snackbar");

               // Add the "show" class to DIV
               x.className = "show";

               // After 3 seconds, remove the show class from DIV
               setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
               document.getElementsByName('name')[0].value = '';
               document.getElementsByName('Subject')[0].value = '';
               document.getElementsByName('_replyto')[0].value = '';
               document.getElementsByName('message')[0].value = '';
          }
     })

     // Formun sayfa yenilenmesini engellemek için aşağıdaki satırı ekleyebilirsiniz

});

document.addEventListener('DOMContentLoaded', function () {
     keyBlocked();
     preventDefault();
     startSection1();
     waitMe(true);
     loggedUserInfo(() => {
          firebase.database().ref('count/counter').transaction(function (currentValue) {
               document.getElementById("totalVisitors").innerHTML = currentValue;
               return (currentValue || 0) + 1;
          });


     });
     getCvData((response) => {
          about = response.about;
          follow = response.follows;
          skill = response.skills
          project = response.project;
          experience = response.experience;
          setFollow();
          setAbout();
          setSkill();
          setProject();
          setExperience();
          setContactMeInfo();
          waitMe(false);
     })
});

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