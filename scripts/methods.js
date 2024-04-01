// Bu cv entegrasyonu, dinamikleştirme işlemlerini gerçekleştirir.
// İsmet Murat ONAY tarafından yazılmıştır.
let about;
let follow;
let skill;
let project;
let experience;
let senderInfo;
function convertDate(dateString) {
     const [month, year] = dateString.split('-');
     return new Date(`${year}-${month}`);
}
function getCvData(callback) {
     const apiUrl = 'https://muratonay.com.tr/api//api-get-cv';
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
               callback(data.data);
          })
          .catch(error => {
               console.error('Hata:', error);
          });

}

function setFollow() {

     let followContainer = document.getElementById("follow-container");
     followContainer.innerHTML = "";


     Object.values(follow).forEach((followDetail) => {


          let a = document.createElement("a");
          a.className = "btn btn-default btn-round btn-lg btn-icon";
          a.href = followDetail.href;
          a.rel = "tooltip";
          a.title = followDetail.title;
          a.target = "_blank";

          let i = document.createElement("i");
          i.className = followDetail.iconLink;

          a.appendChild(i);
          followContainer.appendChild(a);

     })

}

function setAbout() {
     let paragraphContainer = document.getElementById("paragraph-container");
     let aboutKeys = Object.keys(about);
     let paragraphKeys = [];
     for (const element of aboutKeys) {
          if (element.includes("paragraph")) {
               paragraphKeys.push(element);
          }
     }

     if (paragraphKeys.length != 0) {
          for (const element of paragraphKeys) {
               let p = document.createElement("p");
               p.innerText = about[element];
               paragraphContainer.appendChild(p);
          }
     }

     document.getElementById("topNameSurname").innerText = about.name;
     document.getElementById("topTag").innerText = about.tag;

     document.getElementById("about-age").innerText = calculateAge(about.age);
     document.getElementById("about-email").innerText = about.email;
     document.getElementById("about-phone").innerText = about.phone;
     document.getElementById("about-address").innerText = about.adress;
     document.getElementById("about-language").innerText = "Turkish, English"
}

function setSkill() {
     let skillLength = skill.length;
     let iterator = 0;
     let loop = skillLength % 2 == 1 ? (parseInt(skillLength / 2) + 1) : parseInt((skillLength / 2))
     for (let i = 0; i < loop; i++) {
          let row = document.createElement("div");
          row.className = "row";
          row.style.backgroundColor = "#212134";
          let innerLoop = i + 1 == loop ? 1 : 2
          for (let j = 0; j < innerLoop; j++) {
               let col_md_6 = document.createElement("div");
               col_md_6.className = "col-md-6";


               let progress_container = document.createElement("div");
               progress_container.className = "progress-container progress-primary";

               let span = document.createElement("span");
               span.className = "progress-badge";
               span.innerText = skill[iterator].skillName;

               let progress = document.createElement("div");
               progress.className = "progress";

               let progress_inside_div = document.createElement("div");
               progress_inside_div.className = "progress-bar progress-bar-primary";
               progress_inside_div.setAttribute("data-aos", "progress-full");
               progress_inside_div.setAttribute("data-aos-offset", "10");
               progress_inside_div.setAttribute("data-aos-duration", "2000");
               progress_inside_div.role = "progressbar";
               progress_inside_div.setAttribute("aria-valuenow", "60");
               progress_inside_div.setAttribute("aria-valuemin", "0");
               progress_inside_div.setAttribute("aria-valuemax", "100");
               progress_inside_div.style.width = "100%";

               let inside_span = document.createElement("span");
               inside_span.className = "progress-value";
               inside_span.innerText = "";//skill[iterator].percentage + "%";

               progress.appendChild(progress_inside_div);
               progress.appendChild(inside_span);

               progress_container.appendChild(span);
               progress_container.appendChild(progress);

               col_md_6.appendChild(progress_container);

               row.appendChild(col_md_6);

               iterator++;
          }
          document.getElementById("card-body").appendChild(row);
     }


}

function setProject() {
     let developmentKeys = Object.keys(project);


     let ul = document.createElement("ul");
     ul.className = "nav nav-pills nav-pills-primary";
     ul.role = "tablist";

     for (let i = 0; i < developmentKeys.length; i++) {
          let selectedProjectRoot = project[developmentKeys[i]];

          let li = document.createElement("li");
          li.className = "nav-item";
          li.title = developmentKeys[i].toLocaleUpperCase("tr-TR") + " DEVELOPMENT"
          if (i == 0) {
               document.getElementById("selectedProjectId").innerText = li.title;
          }

          li.onclick = function () {
               document.getElementById("selectedProjectId").innerText = li.title;
          }

          let a = document.createElement("a");
          a.className = "nav-link" + (i == 0 ? " active" : "")
          a.setAttribute("data-toggle", "tab");
          a.href = "#" + developmentKeys[i] + "-development";
          a.role = "tablist";



          let iTag = document.createElement("i");
          iTag.className = selectedProjectRoot.icon;
          iTag.ariaHidden = "true";


          a.appendChild(iTag);
          li.appendChild(a);
          ul.appendChild(li);
     }
     document.getElementById("tabList-rounded-header").appendChild(ul);


     for (let i = 0; i < developmentKeys.length; i++) {
          let selectedProject = Object.values(project[developmentKeys[i]].projects);

          let tab_pane = document.createElement("div");
          tab_pane.className = "tab-pane" + (i == 0 ? " active" : "");
          tab_pane.id = developmentKeys[i] + "-development";

          let ml_auto_mr_auto = document.createElement("div");
          ml_auto_mr_auto.className = "ml-auto mr-auto";

          let row = document.createElement("div");
          row.className = "row";

          for (const element of selectedProject) {
               let col_md_6 = document.createElement("div");
               col_md_6.className = "col-md-6";

               let cc_portfolio = document.createElement("div");
               cc_portfolio.className = "cc-porfolio-image img-raised";
               cc_portfolio.setAttribute("data-aos", "fade-up");
               cc_portfolio.setAttribute("data-aos-anchor-placement", "top-bottom");

               let a = document.createElement("a");
               a.href = "#" + developmentKeys[i] + "-development";

               let figure = document.createElement("figure");
               figure.className = "cc-effect";

               let img = document.createElement("img");
               img.src = element.imageUrl;
               img.alt = "Image";

               let figcaption = document.createElement("figcaption");
               figcaption.id = element.projectName;

               figcaption.addEventListener("click", function () {
                    // Proje URL'sini al
                    var projectUrl = selectedProject.filter(i => i.projectName == this.id)[0].projectUrl;

                    // Yeni pencerede URL'yi aç
                    window.open(projectUrl, "_blank");
               });

               let h4_div = document.createElement("div");
               h4_div.className = "h4";
               h4_div.innerText = element.projectName;

               let p = document.createElement("p");
               p.innerText = element.projectDescription;

               figcaption.appendChild(h4_div);
               figcaption.appendChild(p);

               figure.appendChild(img);
               figure.appendChild(figcaption);

               a.appendChild(figure);

               cc_portfolio.appendChild(a);

               col_md_6.appendChild(cc_portfolio);

               row.appendChild(col_md_6);
          }

          ml_auto_mr_auto.appendChild(row);
          tab_pane.appendChild(ml_auto_mr_auto);

          document.getElementById("tab-content-mt-5").appendChild(tab_pane);
     }
}

function setExperience() {
     experience.sort((a, b) => convertDate(b.startDate) - convertDate(a.startDate));
     let cc_experience = document.createElement("div");
     cc_experience.className = "container cc-experience";


     let h4_title_div = document.createElement("div");
     h4_title_div.className = "h4 text-center mb-4 title";
     h4_title_div.innerText = "Work Experience";

     cc_experience.appendChild(h4_title_div)
     for (const element of experience) {

          let card = document.createElement("div");
          card.className = "card";

          let row = document.createElement("div");
          row.className = "row";

          let col_md_3 = document.createElement("div");

          col_md_3.style.display = "flex";
          col_md_3.style.alignItems = "center";
          col_md_3.style.justifyContent = "center";
          col_md_3.className = "col-md-3 bg-primary";
          col_md_3.setAttribute("data-aos", "fade-right");
          col_md_3.setAttribute("data-aos-offset", "50");
          col_md_3.setAttribute("data-aos-duration", "500");

          let cc_experience_header = document.createElement("div");
          cc_experience_header.className = "card-body cc-experience-header";
          cc_experience_header.style.backgroundColor = "#212134"

          let p = document.createElement("p");
          p.innerText = element.startDate + " - " + element.endDate;

          let h5_div = document.createElement("div");
          h5_div.className = "h5";
          h5_div.style.color = "#05d462";
          h5_div.innerText = element.company;

          let col_md_9 = document.createElement("div");
          col_md_9.className = "col-md-9";
          col_md_9.setAttribute("data-aos", "fade-left");
          col_md_9.setAttribute("data-aos-offset", "50");
          col_md_9.setAttribute("data-aos-duration", "500");

          let card_body = document.createElement("div");
          card_body.className = "card-body";

          let card_body_h5_div = document.createElement("div");
          card_body_h5_div.className = "h5";
          card_body_h5_div.style.color = "#05d462";
          card_body_h5_div.style.fontWeight = "bold";
          card_body_h5_div.innerText = element.experiencePosition;

          let card_body_p = document.createElement("p");
          //card_body_p.innerText = element.description;

          let lines = element.description.split("[br]"); // Paragrafları ayır

          for (let line of lines) {
               let paragraph = document.createElement("p"); // Yeni bir <p> elementi oluştur
               let boldRegex = /<b>(.*?)<\/b>/g; // Kalın yazıyı içeren düzenli ifade
               let matches = line.matchAll(boldRegex); // Düzenli ifadeyi kullanarak eşleşmeleri bul

               if (matches) {
                    for (const match of matches) {
                         let boldText = match[1]; // Kalın yazı içeriğini al
                         let boldElement = document.createElement("b"); // Yeni bir <b> elementi oluştur
                         boldElement.textContent = boldText; // Kalın yazı içeriğini ayarla
                         line = line.replace(match[0], boldElement.outerHTML); // Kalın yazıyı orijinal metinde değiştir
                    }
               }
               paragraph.innerHTML = line; // Paragraf içeriğini ayarla
               card_body_p.appendChild(paragraph);
          }
          card_body.appendChild(card_body_h5_div);
          card_body.appendChild(card_body_p);

          col_md_9.appendChild(card_body);

          cc_experience_header.appendChild(p);
          cc_experience_header.appendChild(h5_div);

          col_md_3.appendChild(cc_experience_header);

          row.appendChild(col_md_3);
          row.appendChild(col_md_9);

          card.appendChild(row);

          cc_experience.appendChild(card);

     }
     document.getElementById("experience").appendChild(cc_experience);
}

function setContactMeInfo() {
     let contact_me_info = document.getElementById("contact-me-info");

     let mb_0_address = document.createElement("p");
     mb_0_address.className = "mb-0";

     let mb_0_address_strong = document.createElement("strong");
     mb_0_address_strong.innerText = "Adress ";

     let pb_2_address = document.createElement("p");
     pb_2_address.className = "pb-2";
     pb_2_address.innerText = about.adress;


     let mb_0_phone = document.createElement("p");
     mb_0_phone.className = "mb-0";

     let mb_0_phone_strong = document.createElement("strong");
     mb_0_phone_strong.innerText = "Phone ";

     let pb_2_phone = document.createElement("p");
     pb_2_phone.className = "pb-2";
     pb_2_phone.innerText = about.phone;


     let mb_0_email = document.createElement("p");
     mb_0_email.className = "mb-0";

     let mb_0_email_strong = document.createElement("strong");
     mb_0_email_strong.innerText = "Email ";

     let pb_2_email = document.createElement("p");
     pb_2_email.className = "pb-2";
     pb_2_email.innerText = about.email;


     mb_0_address.appendChild(mb_0_address_strong);
     mb_0_email.appendChild(mb_0_email_strong);
     mb_0_phone.appendChild(mb_0_phone_strong);

     contact_me_info.appendChild(mb_0_address);
     contact_me_info.appendChild(pb_2_address);
     contact_me_info.appendChild(mb_0_email);
     contact_me_info.appendChild(pb_2_email);
     contact_me_info.appendChild(mb_0_phone);
     contact_me_info.appendChild(pb_2_phone);

}

function loggedUserInfo(callback) {
     try {
          fetch('https://freeipapi.com/api/json')
               .then(response => response.json())
               .then(data => {
                    senderInfo = data;
                    document.getElementById("userIp").innerText = data.ipAddress;
                    callback()
               })
               .catch(error => {
                    console.log(error);
                    callback()
               });
     } catch (error) {
          console.log("Kullanıcı network bilgisi alınırken hata oluştu.");
          callback()
     }
}

function calculateAge(birthDateString) {
     // Ay isimlerini Türkçe'ye çevir
     // Tarih formatı: "01 Oca 1996 Ptz 00:00:01"
     const months = {
          "Oca": 0,
          "Şub": 1,
          "Mar": 2,
          "Nis": 3,
          "May": 4,
          "Haz": 5,
          "Tem": 6,
          "Ağu": 7,
          "Eyl": 8,
          "Eki": 9,
          "Kas": 10,
          "Ara": 11
     };

     // Tarihi parçalara ayır
     const parts = birthDateString.split(" ");

     // Gerekli bilgileri al
     const day = parseInt(parts[0], 10);
     const month = months[parts[1]];
     const year = parseInt(parts[2], 10);

     // Yeni bir tarih nesnesi oluştur
     const birthDate = new Date(year, month, day);

     // Şu anki tarihi al
     const currentDate = new Date();

     // Doğum tarihini ve şu anki tarihi karşılaştır
     let age = currentDate.getFullYear() - birthDate.getFullYear();

     // Doğum gününden önce mi kontrol et
     const birthMonth = birthDate.getMonth();
     const currentMonth = currentDate.getMonth();
     if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
          age--;
     }

     return age;
}

function waitMe(shown) {
     if (shown) {
          document.getElementById("loader-overlay").style.display = "flex"
     }
     else {
          document.getElementById("loader-overlay").style.display = "none"
     }
}


waitMe(true);