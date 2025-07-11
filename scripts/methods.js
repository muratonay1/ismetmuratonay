// Bu cv entegrasyonu, dinamikleştirme işlemlerini gerçekleştirir.
// İsmet Murat ONAY tarafından yazılmıştır.
let about;
let follow;
let skill;
let project;
let experience;
let reference;
let senderInfo;
let cvData;
function convertDate(dateString) {
     const [month, year] = dateString.split('-');
     return new Date(`${year}-${month}`);
}
function getCvData(callback) {
     GenericRequestService.request({
          url: RequestUrl.API_GET_CV,
          method: 'GET',
          callback: (data) => {
               callback(data.data);
          },
          errorCallback: (error) => {
               console.error('Hata oluştu:', error);
          },
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
          let innerLoop = i + 1 == loop ? 1 : 2;
          for (let j = 0; j < innerLoop; j++) {
               let col_md_6 = document.createElement("div");
               col_md_6.className = "col-md-6";
               let progress_container = document.createElement("div");
               progress_container.className = "progress-container progress-primary";
               let span = document.createElement("span");
               span.className = "progress-badge";
               span.style.fontWeight = "bold";
               span.appendChild(document.createTextNode(skill[iterator].skillName));
               let progress = document.createElement("div");
               progress.className = "progress";
               let progress_inside_div = document.createElement("div");
               progress_inside_div.className = "progress-bar progress-bar-primary";
               progress_inside_div.setAttribute("data-aos", "progress-full");
               progress_inside_div.setAttribute("data-aos-offset", "5");
               progress_inside_div.setAttribute("data-aos-duration", "2000");
               progress_inside_div.role = "progressbar";
               progress_inside_div.setAttribute("aria-valuenow", skill[iterator].percentage);
               progress_inside_div.setAttribute("aria-valuemin", "0");
               progress_inside_div.setAttribute("aria-valuemax", "100");
               progress_inside_div.style.width = "100%";
               let inside_span = document.createElement("span");
               inside_span.className = "progress-value";
               inside_span.innerText = "";
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
               col_md_6.style.display = "flex";
               col_md_6.style.alignItems = "center";
               col_md_6.style.justifyContent = "center";
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
                    var projectUrl = selectedProject.filter(i => i.projectName == this.id)[0].projectUrl;
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
          let lines = element.description.split("[br]");
          for (let line of lines) {
               let paragraph = document.createElement("p");
               let boldRegex = /<b>(.*?)<\/b>/g;
               let matches = line.matchAll(boldRegex);
               if (matches) {
                    for (const match of matches) {
                         let boldText = match[1];
                         let boldElement = document.createElement("b");
                         boldElement.textContent = boldText;
                         line = line.replace(match[0], boldElement.outerHTML);
                    }
               }
               paragraph.innerHTML = line;
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

function setReference() {
     let cc_reference = document.createElement("div");
     let reference_slider = document.createElement("div");
     let slides = document.createElement("div");
     let h4_title = document.createElement("div");
     cc_reference.className = "container cc-reference";
     reference_slider.className = "reference-slider";
     reference_slider.id = "reference-slider";
     slides.className = "slides";
     h4_title.className = "h4 mb-4 text-center title";
     h4_title.innerHTML = "References";
     if (reference.length == 0) {
          cc_reference.appendChild(h4_title);
          let info_div = document.createElement("div");
          info_div.innerHTML = "Referans Bulunamadı";
          info_div.style.display = "flex";
          info_div.style.justifyContent = "center";
          info_div.style.color = "white";
          document.getElementById("reference").appendChild(info_div);
          return;
     }
     for (let i = 0; i < reference.length; i++) {
          let slide = document.createElement("div");
          let card_reference_card_text_center = document.createElement("div");
          let card_body = document.createElement("div");
          let img = document.createElement("img");
          let h5 = document.createElement("h5");
          let p_job = document.createElement("p");
          let pMt3 = document.createElement("p");
          let a_mailto = document.createElement("a");
          let i_mailto = document.createElement("i");
          let p_down = document.createElement("p");
          let a_down = document.createElement("a");
          let i_down = document.createElement("i");
          slide.className = "slide";
          card_reference_card_text_center.className = "card reference-card text-center";
          card_reference_card_text_center.style.backgroundColor = "#212134";
          card_reference_card_text_center.style.borderRadius = "0";
          card_reference_card_text_center.style.boxShadow = "none";
          card_body.className = "card-body";
          img.src = "https://i.pravatar.cc/100";
          img.alt = "Reference - " + i + 1;
          img.className = "rounded-circle mb-3";
          h5.className = "card-title";
          h5.innerHTML = reference[i].referenceName;
          p_job.className = "card_text";
          p_job.innerHTML = reference[i].job;
          pMt3.className = "mt-3";
          a_mailto.href = "mailto:" + reference[i].email;
          a_mailto.className = "text-decoration-none";
          i_mailto.className = "as fa-envelope";
          a_down.href = reference[i].linkedin;
          a_down.target = "_blank";
          a_down.className = "text-decoration-none";
          i_down.className = "fab fa-linkedin";
          a_down.appendChild(i_down);
          a_down.innerHTML = "LinkedIn Profile";
          p_down.appendChild(a_down);
          a_mailto.appendChild(i_mailto);
          a_mailto.innerHTML = reference[i].email;
          pMt3.appendChild(a_mailto);
          card_body.appendChild(img);
          card_body.appendChild(h5);
          card_body.appendChild(p_job);
          card_body.appendChild(pMt3);
          card_body.appendChild(p_down);
          card_reference_card_text_center.appendChild(card_body);
          slide.appendChild(card_reference_card_text_center);
          slides.appendChild(slide);
     }
     let slider_controls = document.createElement("div");
     let prev_button = document.createElement("button");
     let next_button = document.createElement("button");
     slider_controls.className = "slider-controls";
     prev_button.className = "prev";
     prev_button.innerHTML = "&#10094";
     next_button.className = "next";
     next_button.innerHTML = "&#10095";
     slider_controls.appendChild(prev_button);
     slider_controls.appendChild(next_button);
     reference_slider.appendChild(slides);
     reference_slider.appendChild(slider_controls)
     cc_reference.appendChild(h4_title);
     cc_reference.appendChild(reference_slider);
     document.getElementById("reference").innerHTML = "";
     document.getElementById("reference").appendChild(cc_reference);
     document.getElementById("reference").innerHTML = "";
     document.getElementById("reference").appendChild(cc_reference);
     const totalSlides = document.querySelectorAll('.slide').length;
     let startX = 0;
     let endX = 0;
     let currentIndex = 0;
     function updateSlider() {
          slides.style.transform = `translateX(-${currentIndex * 100}%)`;
     }
     document.querySelector('.prev').addEventListener('click', () => {
          currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
          updateSlider();
     });
     document.querySelector('.next').addEventListener('click', () => {
          currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
          updateSlider();
     });
     slides.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
     });
     slides.addEventListener('touchmove', (e) => {
          endX = e.touches[0].clientX;
     });
     slides.addEventListener('touchend', () => {
          if (startX > endX + 50) {
               currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
          } else if (startX < endX - 50) {
               currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
          }
          updateSlider();
     });
}
function loggedUserInfo(callback) {
     try {
          fetch('https://ipinfo.io/json')
          fetch('https://ipinfo.io/json')
               .then(response => response.json())
               .then(data => {
                    senderInfo = data;
                    document.getElementById("userIp").innerText = data.ip;
                    document.getElementById("userIp").innerText = data.ip;
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
     const parts = birthDateString.split(" ");
     const day = parseInt(parts[0], 10);
     const month = months[parts[1]];
     const year = parseInt(parts[2], 10);
     const birthDate = new Date(year, month, day);
     const currentDate = new Date();
     let age = currentDate.getFullYear() - birthDate.getFullYear();
     const birthMonth = birthDate.getMonth();
     const currentMonth = currentDate.getMonth();
     if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
          age--;
     }
     return age;
}
function waitMe(shown) {
     document.getElementById("loader-overlay").style.display = shown ? "flex" : "none";
}
waitMe(true);
