const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");
const siteHeader = document.getElementById("siteHeader");


// TELEFON MENÜSÜ

menuButton.addEventListener("click", () => {

    const isOpen = menuButton.classList.toggle("open");
    navbar.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
});


// MENÜDEN BİR YERE BASINCA MENÜYÜ KAPAT

const menuLinks = document.querySelectorAll("#navbar a");

menuLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuButton.classList.remove("open");
        navbar.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");

    });

});


// AŞAĞI KAYDIRINCA HEADER EFEKTİ

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

});


// SAYFA AÇILMA ANİMASYONU

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    observer.observe(element);
});


// FOOTER YILI

document.getElementById("year").textContent =
    new Date().getFullYear();




// RANDEVU TARİHİ: GEÇMİŞ TARİH SEÇİLEMEZ
const appointmentDate = document.getElementById("date");

if (appointmentDate) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    appointmentDate.min = `${year}-${month}-${day}`;
}

// ================================
// RANDEVU WHATSAPP FORMU
// ================================

const appointmentForm = document.getElementById("appointmentForm");

// TEST WHATSAPP NUMARASI
const whatsappNumber = "905349309880";

const appointmentModal =
    document.getElementById("appointmentModal");

const appointmentPreview =
    document.getElementById("appointmentPreview");

const appointmentModalClose =
    document.getElementById("appointmentModalClose");

const appointmentModalBackdrop =
    document.getElementById("appointmentModalBackdrop");

const appointmentEditButton =
    document.getElementById("appointmentEditButton");

const appointmentConfirmButton =
    document.getElementById("appointmentConfirmButton");

let pendingWhatsappURL = "";


function closeAppointmentModal() {

    appointmentModal.classList.remove("show");

    appointmentModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");

}


if (appointmentForm) {

    appointmentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const appointmentType =
            document.getElementById("appointmentType").value;

        const date =
            document.getElementById("date").value;

        const time =
            document.getElementById("time").value;

        const note =
            document.getElementById("note").value.trim();

        const consent =
            document.getElementById("consent");

        if (!consent.checked) {

            alert(
                "Devam etmek için iletişim bilgilerinizin WhatsApp üzerinden gönderilmesini kabul etmeniz gerekiyor."
            );

            return;
        }

        const cleanPhone =
            phone.replace(/\D/g, "");

        if (cleanPhone.length < 10) {

            alert(
                "Lütfen geçerli bir telefon numarası girin."
            );

            return;
        }

        const formattedDate = date
            ? date.split("-").reverse().join(".")
            : "Belirtilmedi";

        const message =
`Merhaba,

*RANDEVU TALEBİ*
------------------------------

*Ad Soyad:* ${name}
*Telefon:* ${phone}
*Randevu Türü:* ${appointmentType}
*Tercih Edilen Tarih:* ${formattedDate}
*Tercih Edilen Saat:* ${time}
*Not:* ${note || "Belirtilmedi"}

------------------------------

Uygunluk durumuna göre dönüş sağlayabilir misiniz?

Teşekkür ederim.`;

        pendingWhatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        appointmentPreview.innerHTML = `
            <div class="preview-row">
                <span>Ad Soyad</span>
                <strong>${name}</strong>
            </div>

            <div class="preview-row">
                <span>Telefon</span>
                <strong>${phone}</strong>
            </div>

            <div class="preview-row">
                <span>Randevu Türü</span>
                <strong>${appointmentType}</strong>
            </div>

            <div class="preview-row">
                <span>Tarih</span>
                <strong>${formattedDate}</strong>
            </div>

            <div class="preview-row">
                <span>Saat</span>
                <strong>${time}</strong>
            </div>

            <div class="preview-row">
                <span>Not</span>
                <strong>${note || "Belirtilmedi"}</strong>
            </div>
        `;

        appointmentModal.classList.add("show");

        appointmentModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("modal-open");

    });

}


if (appointmentConfirmButton) {

    appointmentConfirmButton.addEventListener(
        "click",
        () => {

            if (!pendingWhatsappURL) {
                return;
            }

            const toastMessage =
                document.getElementById("toastMessage");

            closeAppointmentModal();

            toastMessage.classList.add("show");

            setTimeout(() => {

                window.open(
                    pendingWhatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

                toastMessage.classList.remove("show");

            }, 350);

        }
    );

}


[
    appointmentModalClose,
    appointmentModalBackdrop,
    appointmentEditButton
].forEach(element => {

    if (element) {

        element.addEventListener(
            "click",
            closeAppointmentModal
        );

    }

});


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        appointmentModal &&
        appointmentModal.classList.contains("show")
    ) {

        closeAppointmentModal();

    }

});


// HENÜZ BAĞLANTI EKLENMEMİŞ BUTONLAR
// Gerçek YouTube / Instagram linkleri eklendiğinde bu kısım kaldırılabilir.

const placeholderLinks = document.querySelectorAll(
    '.content-link[href="#"], .social-button[href="#"]'
);

placeholderLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        alert("Bu bağlantı henüz eklenmedi.");

    });

});


// ================================
// SIK SORULAN SORULAR
// ================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const isOpen = item.classList.contains("open");

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("open");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherAnswer.style.maxHeight = null;

        });

        if (!isOpen) {

            item.classList.add("open");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


// ================================
// AKTİF MENÜ VE YUKARI ÇIK
// ================================

const backToTop = document.getElementById("backToTop");

const sectionIds = [
    "anasayfa",
    "hakkimda",
    "hizmetler",
    "videolar",
    "icerikler",
    "yorumlar",
    "konum",
    "iletisim"
];

const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

const navAnchors = document.querySelectorAll("#navbar a");


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 140;

    let currentId = "anasayfa";

    sections.forEach(section => {

        if (scrollPosition >= section.offsetTop) {
            currentId = section.id;
        }

    });

    navAnchors.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentId) {
            link.classList.add("active");
        }

    });

}


window.addEventListener("scroll", () => {

    updateActiveNavigation();

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


updateActiveNavigation();


// ================================
// V13 SAYFA YÜKLENME VE ADRES KOPYALAMA
// ================================

const pageLoader =
    document.getElementById("pageLoader");

window.addEventListener("load", () => {

    setTimeout(() => {

        if (pageLoader) {
            pageLoader.classList.add("hide");
        }

    }, 250);

});


const copyAddressButton =
    document.getElementById("copyAddressButton");

if (copyAddressButton) {

    copyAddressButton.addEventListener("click", async () => {

        const address =
            copyAddressButton.dataset.address;

        try {

            await navigator.clipboard.writeText(address);

            const oldText =
                copyAddressButton.textContent;

            copyAddressButton.textContent =
                "Adres Kopyalandı";

            setTimeout(() => {

                copyAddressButton.textContent =
                    oldText;

            }, 1600);

        } catch (error) {

            alert(
                "Adres: " + address
            );

        }

    });

}


// ================================
// V15 RANDEVU FORMU GELISTIRMELERI
// ================================

const appointmentName =
    document.getElementById("name");

const appointmentPhone =
    document.getElementById("phone");

const appointmentTypeField =
    document.getElementById("appointmentType");

const appointmentTime =
    document.getElementById("time");

const appointmentNote =
    document.getElementById("note");

const appointmentConsent =
    document.getElementById("consent");

const formProgressFill =
    document.getElementById("formProgressFill");

const formProgressText =
    document.getElementById("formProgressText");

const noteCounter =
    document.getElementById("noteCounter");

const clearAppointmentForm =
    document.getElementById("clearAppointmentForm");


// TELEFON NUMARASINI 0 5XX XXX XX XX FORMATINA GETIR

function formatTurkishPhone(value) {

    let digits =
        value.replace(/\D/g, "");

    if (digits.startsWith("90")) {
        digits = "0" + digits.slice(2);
    }

    digits = digits.slice(0, 11);

    if (!digits) {
        return "";
    }

    const parts = [];

    if (digits.length >= 1) {
        parts.push(digits.slice(0, 1));
    }

    if (digits.length > 1) {
        parts.push(digits.slice(1, 4));
    }

    if (digits.length > 4) {
        parts.push(digits.slice(4, 7));
    }

    if (digits.length > 7) {
        parts.push(digits.slice(7, 9));
    }

    if (digits.length > 9) {
        parts.push(digits.slice(9, 11));
    }

    return parts.join(" ");

}


if (appointmentPhone) {

    appointmentPhone.addEventListener("input", () => {

        appointmentPhone.value =
            formatTurkishPhone(
                appointmentPhone.value
            );

        updateAppointmentProgress();

    });

}


// NOT KARAKTER SAYACI

function updateNoteCounter() {

    if (!appointmentNote || !noteCounter) {
        return;
    }

    noteCounter.textContent =
        appointmentNote.value.length +
        " / 300";

}


if (appointmentNote) {

    appointmentNote.addEventListener(
        "input",
        updateNoteCounter
    );

}


// FORM DOLULUK ORANI

function fieldIsComplete(field) {

    if (!field) {
        return false;
    }

    if (field.type === "checkbox") {
        return field.checked;
    }

    if (field.id === "phone") {

        const phoneDigits =
            field.value.replace(/\D/g, "");

        return phoneDigits.length === 11;
    }

    return field.value.trim() !== "";

}


function updateAppointmentProgress() {

    const progressFields = [
        appointmentName,
        appointmentPhone,
        appointmentTypeField,
        appointmentDate,
        appointmentTime,
        appointmentConsent
    ];

    const completed =
        progressFields.filter(
            fieldIsComplete
        ).length;

    const percentage =
        Math.round(
            (completed / progressFields.length) * 100
        );

    if (formProgressFill) {
        formProgressFill.style.width =
            percentage + "%";
    }

    if (formProgressText) {
        formProgressText.textContent =
            percentage + "%";
    }

    progressFields.forEach(field => {

        if (!field || field.type === "checkbox") {
            return;
        }

        field.classList.toggle(
            "valid-field",
            fieldIsComplete(field)
        );

    });

}


[
    appointmentName,
    appointmentTypeField,
    appointmentDate,
    appointmentTime,
    appointmentConsent
].forEach(field => {

    if (!field) {
        return;
    }

    field.addEventListener(
        "input",
        updateAppointmentProgress
    );

    field.addEventListener(
        "change",
        updateAppointmentProgress
    );

});


// FORMU TEMIZLE

if (clearAppointmentForm && appointmentForm) {

    clearAppointmentForm.addEventListener(
        "click",
        () => {

            const shouldClear =
                confirm(
                    "Randevu formundaki tüm bilgileri temizlemek istiyor musunuz?"
                );

            if (!shouldClear) {
                return;
            }

            appointmentForm.reset();

            if (appointmentDate) {

                const today =
                    new Date();

                const year =
                    today.getFullYear();

                const month =
                    String(
                        today.getMonth() + 1
                    ).padStart(2, "0");

                const day =
                    String(
                        today.getDate()
                    ).padStart(2, "0");

                appointmentDate.min =
                    `${year}-${month}-${day}`;

            }

            updateNoteCounter();
            updateAppointmentProgress();

            appointmentName.focus();

        }
    );

}


updateNoteCounter();
updateAppointmentProgress();


// ================================
// V16 ACIK / KOYU TEMA
// ================================

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const themeColorMeta =
    document.querySelector('meta[name="theme-color"]');


function applyTheme(theme) {

    const dark =
        theme === "dark";

    document.body.classList.toggle(
        "dark-mode",
        dark
    );

    if (themeIcon) {
        themeIcon.textContent =
            dark ? "☀" : "☾";
    }

    if (themeToggle) {

        themeToggle.setAttribute(
            "aria-label",
            dark
                ? "Açık temaya geç"
                : "Koyu temaya geç"
        );

        themeToggle.title =
            dark
                ? "Açık temaya geç"
                : "Koyu temaya geç";
    }

    if (themeColorMeta) {
        themeColorMeta.setAttribute(
            "content",
            dark ? "#0b1820" : "#1783c2"
        );
    }

}


const savedTheme =
    localStorage.getItem(
        "ceyhunNuriTheme"
    );

const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

const initialTheme =
    savedTheme ||
    (
        systemPrefersDark
            ? "dark"
            : "light"
    );

applyTheme(initialTheme);


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const newTheme =
                document.body.classList.contains(
                    "dark-mode"
                )
                    ? "light"
                    : "dark";

            localStorage.setItem(
                "ceyhunNuriTheme",
                newTheme
            );

            applyTheme(newTheme);

        }
    );

}


// ================================
// V18 GIZLILIK VE SCROLL PROGRESS
// ================================

const scrollProgressBar =
    document.getElementById("scrollProgressBar");

function updateScrollProgress() {

    if (!scrollProgressBar) {
        return;
    }

    const scrollTop = window.scrollY;

    const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        scrollableHeight > 0
            ? Math.min(
                100,
                Math.max(
                    0,
                    (scrollTop / scrollableHeight) * 100
                )
            )
            : 0;

    scrollProgressBar.style.width =
        percentage + "%";
}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateScrollProgress
);

updateScrollProgress();


const privacyModal =
    document.getElementById("privacyModal");

const privacyModalBackdrop =
    document.getElementById("privacyModalBackdrop");

const privacyModalClose =
    document.getElementById("privacyModalClose");

const privacyUnderstoodButton =
    document.getElementById("privacyUnderstoodButton");

const openPrivacyFooter =
    document.getElementById("openPrivacyFooter");

const openPrivacyFromConsent =
    document.getElementById("openPrivacyFromConsent");


function openPrivacyModal() {

    if (!privacyModal) {
        return;
    }

    privacyModal.classList.add("show");
    privacyModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}


function closePrivacyModal() {

    if (!privacyModal) {
        return;
    }

    privacyModal.classList.remove("show");
    privacyModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}


[
    openPrivacyFooter,
    openPrivacyFromConsent
].forEach(button => {

    if (button) {
        button.addEventListener(
            "click",
            openPrivacyModal
        );
    }
});


[
    privacyModalBackdrop,
    privacyModalClose,
    privacyUnderstoodButton
].forEach(element => {

    if (element) {
        element.addEventListener(
            "click",
            closePrivacyModal
        );
    }
});


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            privacyModal &&
            privacyModal.classList.contains("show")
        ) {
            closePrivacyModal();
        }
    }
);


// ================================
// V19 VIDEO KARTLARI
// ================================
// YouTube embed kısıtları nedeniyle
// videolar güvenli kart yapısı ile açılır.
// İleride haftalık yeni videolar bu alana eklenebilir.


// ================================
// V24 DIL SISTEMI
// ================================
const translations = {
  "tr": {
    "services_kicker": "HİZMETLER",
    "services_title": "Başlıca değerlendirme alanları",
    "services_desc": "Sık karşılaşılan kas-iskelet, romatizmal ve metabolik sağlık konularına yönelik değerlendirme ve bilgilendirme.",
    "appointment_link": "Randevu Talebi →",
    "s1_title": "Ankilozan Spondilit",
    "s1_desc": "Omurga ve leğen kemiği arasındaki eklemleri etkileyebilen romatizmal süreçler hakkında değerlendirme.",
    "s2_title": "Baş Ağrısı ve Migren",
    "s2_desc": "Tekrarlayan baş ağrısı ve migren şikayetlerinde öykü, tetikleyiciler ve genel durumun değerlendirilmesi.",
    "s3_title": "Bel ve Sırt Ağrısı",
    "s3_desc": "Bel, sırt ve omurga kaynaklı ağrıların nedenlerine yönelik genel değerlendirme ve yaşam önerileri.",
    "s4_title": "Fibromiyalji",
    "s4_desc": "Yaygın kas ağrısı, yorgunluk, hassasiyet ve uyku sorunlarıyla seyreden yakınmaların değerlendirilmesi.",
    "s5_title": "Hasta Bina Sendromu",
    "s5_desc": "Kapalı ortamlarla ilişkili baş ağrısı, yorgunluk ve benzeri şikayetlerin çevresel etkenlerle birlikte değerlendirilmesi.",
    "s6_title": "Huzursuz Bacak Sendromu",
    "s6_desc": "Bacaklarda hareket ettirme isteği, huzursuzluk ve uyku düzenini etkileyen yakınmaların değerlendirilmesi.",
    "s7_title": "İltihabi Bağırsak Hastalıkları",
    "s7_desc": "Crohn hastalığı ve ülseratif kolit gibi iltihabi bağırsak hastalıklarında genel değerlendirme ve bilgilendirme.",
    "s8_title": "Kronik Yorgunluk",
    "s8_desc": "Uzun süren yorgunluk, enerji kaybı ve günlük yaşam performansını etkileyen yakınmaların değerlendirilmesi.",
    "s9_title": "Romatoid Artrit",
    "s9_desc": "Eklem iltihabı, şişlik ve tutuklukla seyreden romatoid artrit sürecinde genel değerlendirme.",
    "s10_title": "Tip 2 Diyabet",
    "s10_desc": "Kan şekeri kontrolü, yaşam alışkanlıkları ve metabolik sağlıkla ilgili genel değerlendirme ve bilgilendirme.",
    "reviews_kicker": "DEĞERLİ YORUMLAR",
    "reviews_title": "Deneyimlerinizi önemsiyoruz",
    "reviews_desc": "Gerçek hasta yorumları izin alındıkça bu alanda paylaşılacaktır.",
    "review_placeholder_1": "Onaylı hasta yorumu eklendiğinde burada yayınlanacaktır.",
    "review_placeholder_2": "Hasta mahremiyeti korunarak yalnızca izin verilen yorumlar paylaşılacaktır.",
    "review_placeholder_3": "Gerçek yorumlar daha sonra bu karta eklenebilir.",
    "verified_label": "Onaylı yorum alanı",
    "privacy_label": "Mahremiyet odaklı",
    "coming_label": "Yakında"
  },
  "en": {
    "services_kicker": "SERVICES",
    "services_title": "Main areas of evaluation",
    "services_desc": "Evaluation and information for common musculoskeletal, rheumatic and metabolic health concerns.",
    "appointment_link": "Request Appointment →",
    "s1_title": "Ankylosing Spondylitis",
    "s1_desc": "Evaluation of rheumatic processes that may affect the spine and sacroiliac joints.",
    "s2_title": "Headache & Migraine",
    "s2_desc": "Assessment of recurring headaches and migraine with attention to history, triggers and overall condition.",
    "s3_title": "Low Back & Back Pain",
    "s3_desc": "General evaluation and lifestyle guidance for pain originating from the lower back, back and spine.",
    "s4_title": "Fibromyalgia",
    "s4_desc": "Evaluation of widespread muscle pain, fatigue, tenderness and sleep-related complaints.",
    "s5_title": "Sick Building Syndrome",
    "s5_desc": "Assessment of headaches, fatigue and similar complaints that may be associated with indoor environments.",
    "s6_title": "Restless Legs Syndrome",
    "s6_desc": "Evaluation of discomfort, urge to move the legs and symptoms affecting sleep.",
    "s7_title": "Inflammatory Bowel Diseases",
    "s7_desc": "General evaluation and information regarding conditions such as Crohn’s disease and ulcerative colitis.",
    "s8_title": "Chronic Fatigue",
    "s8_desc": "Evaluation of prolonged fatigue, low energy and complaints affecting daily performance.",
    "s9_title": "Rheumatoid Arthritis",
    "s9_desc": "General evaluation of rheumatoid arthritis with joint inflammation, swelling and stiffness.",
    "s10_title": "Type 2 Diabetes",
    "s10_desc": "General evaluation and information on blood glucose control, lifestyle and metabolic health.",
    "reviews_kicker": "VALUABLE FEEDBACK",
    "reviews_title": "We value your experience",
    "reviews_desc": "Real patient feedback will be published here only with permission.",
    "review_placeholder_1": "Verified patient feedback will appear here when available.",
    "review_placeholder_2": "Only feedback shared with permission will be published while protecting patient privacy.",
    "review_placeholder_3": "Real feedback can be added to this card later.",
    "verified_label": "Verified feedback area",
    "privacy_label": "Privacy focused",
    "coming_label": "Coming soon"
  },
  "de": {
    "services_kicker": "LEISTUNGEN",
    "services_title": "Wichtige Untersuchungsbereiche",
    "services_desc": "Bewertung und Information zu häufigen muskuloskelettalen, rheumatischen und metabolischen Beschwerden.",
    "appointment_link": "Termin anfragen →",
    "s1_title": "Morbus Bechterew",
    "s1_desc": "Beurteilung rheumatischer Prozesse, die Wirbelsäule und Iliosakralgelenke betreffen können.",
    "s2_title": "Kopfschmerzen & Migräne",
    "s2_desc": "Beurteilung wiederkehrender Kopfschmerzen und Migräne unter Berücksichtigung von Verlauf und Auslösern.",
    "s3_title": "Kreuz- & Rückenschmerzen",
    "s3_desc": "Allgemeine Beurteilung und Lebensstilhinweise bei Schmerzen im unteren Rücken, Rücken und der Wirbelsäule.",
    "s4_title": "Fibromyalgie",
    "s4_desc": "Beurteilung von weit verbreiteten Muskelschmerzen, Müdigkeit, Druckempfindlichkeit und Schlafproblemen.",
    "s5_title": "Sick-Building-Syndrom",
    "s5_desc": "Beurteilung von Kopfschmerzen, Müdigkeit und ähnlichen Beschwerden im Zusammenhang mit Innenräumen.",
    "s6_title": "Restless-Legs-Syndrom",
    "s6_desc": "Beurteilung von Unruhe, Bewegungsdrang der Beine und schlafbeeinträchtigenden Beschwerden.",
    "s7_title": "Entzündliche Darmerkrankungen",
    "s7_desc": "Allgemeine Beurteilung und Information zu Morbus Crohn und Colitis ulcerosa.",
    "s8_title": "Chronische Müdigkeit",
    "s8_desc": "Beurteilung anhaltender Müdigkeit, Energiemangel und Beschwerden mit Einfluss auf den Alltag.",
    "s9_title": "Rheumatoide Arthritis",
    "s9_desc": "Allgemeine Beurteilung rheumatoider Arthritis mit Gelenkentzündung, Schwellung und Steifigkeit.",
    "s10_title": "Typ-2-Diabetes",
    "s10_desc": "Allgemeine Beurteilung und Information zu Blutzuckerkontrolle, Lebensstil und Stoffwechselgesundheit.",
    "reviews_kicker": "WERTVOLLES FEEDBACK",
    "reviews_title": "Ihre Erfahrungen sind uns wichtig",
    "reviews_desc": "Echte Patientenrückmeldungen werden hier nur mit Einwilligung veröffentlicht.",
    "review_placeholder_1": "Verifizierte Patientenrückmeldungen erscheinen hier, sobald sie verfügbar sind.",
    "review_placeholder_2": "Nur freigegebene Rückmeldungen werden unter Wahrung der Privatsphäre veröffentlicht.",
    "review_placeholder_3": "Echte Rückmeldungen können später in dieser Karte ergänzt werden.",
    "verified_label": "Bereich für verifiziertes Feedback",
    "privacy_label": "Datenschutz im Fokus",
    "coming_label": "Demnächst"
  }
};

const languageSelect = document.getElementById("languageSelect");

function applyLanguage(language) {
    const dict = translations[language] || translations.tr;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (dict[key]) {
            element.textContent = dict[key];
        }
    });

    localStorage.setItem("ceyhunNuriLanguage", language);
}

if (languageSelect) {
    const savedLanguage =
        localStorage.getItem("ceyhunNuriLanguage") || "tr";

    languageSelect.value = savedLanguage;
    applyLanguage(savedLanguage);

    languageSelect.addEventListener("change", event => {
        applyLanguage(event.target.value);
    });
}


// ================================
// V28 HIZMET BILGI MODALI
// ================================
const serviceInfoData = {
  "tr": {
    "labels": {
      "kicker": "HİZMET HAKKINDA",
      "what": "Nedir?",
      "why": "Neden olabilir?",
      "action": "Neler yapılabilir?",
      "note": "Bu içerik genel bilgilendirme amaçlıdır; kişisel tanı ve tedavi için hekim değerlendirmesi gerekir.",
      "close": "Kapat",
      "appointment": "Randevu Talebi"
    },
    "s1": {
      "title": "Ankilozan Spondilit",
      "summary": "Özellikle omurga ve sakroiliak eklemleri etkileyebilen, uzun süreli iltihapla seyreden romatizmal bir hastalıktır.",
      "what": "Bel ve kalça çevresinde ağrı, sabah tutukluğu ve hareket kısıtlılığı yapabilir. Bazı kişilerde göz ve diğer organlar da etkilenebilir.",
      "why": "Tek bir nedeni yoktur. Genetik yatkınlık ve bağışıklık sisteminin anormal iltihabi yanıtı önemli rol oynar.",
      "action": "Uzun süren bel ağrısı ve sabah tutukluğu varsa değerlendirme alınmalıdır. Düzenli hareket, uygun egzersiz ve hekim tarafından planlanan takip önemlidir."
    },
    "s2": {
      "title": "Baş Ağrısı ve Migren",
      "summary": "Migren; tekrarlayan, çoğu zaman zonklayıcı baş ağrısı ve ışık-ses hassasiyeti gibi belirtilerle seyredebilir.",
      "what": "Ataklar saatler sürebilir; bulantı, görsel belirtiler veya günlük aktivitede zorlanma eşlik edebilir.",
      "why": "Genetik yatkınlık, uyku düzensizliği, stres, açlık, bazı yiyecekler ve hormonal değişimler tetikleyici olabilir.",
      "action": "Atak günlüğü tutmak, düzenli uyku ve öğün düzeni yardımcı olabilir. Yeni, çok şiddetli veya farklı karakterde baş ağrısında tıbbi değerlendirme gerekir."
    },
    "s3": {
      "title": "Bel ve Sırt Ağrısı",
      "summary": "Bel ve sırt ağrısı kas, eklem, disk veya omurgayı çevreleyen yapılardan kaynaklanabilen yaygın bir şikayettir.",
      "what": "Ağrı hareketle artabilir, bacağa yayılabilir veya kas spazmı ve hareket kısıtlılığıyla birlikte görülebilir.",
      "why": "Kas zorlanması, uzun süreli oturma, yanlış yüklenme, disk sorunları ve bazı romatizmal hastalıklar neden olabilir.",
      "action": "Hafif vakalarda kontrollü hareket ve ergonomi önemlidir. Güç kaybı, uyuşma, idrar-dışkı kontrolünde değişiklik veya travma varsa acil değerlendirme gerekir."
    },
    "s4": {
      "title": "Fibromiyalji",
      "summary": "Yaygın vücut ağrısı, hassasiyet, yorgunluk ve uyku bozukluklarıyla seyreden kronik bir ağrı durumudur.",
      "what": "Kaslarda ve yumuşak dokularda yaygın ağrıya, zihinsel yorgunluk ve dinlenememiş uyanma eşlik edebilir.",
      "why": "Kesin nedeni tam bilinmez. Ağrı işleme sistemindeki hassasiyet, uyku sorunları, stres ve genetik yatkınlık etkili olabilir.",
      "action": "Düzenli ve kademeli egzersiz, kaliteli uyku ve stres yönetimi önemlidir. Tanı için diğer olası nedenlerin hekim tarafından değerlendirilmesi gerekir."
    },
    "s5": {
      "title": "Hasta Bina Sendromu",
      "summary": "Belirli bir kapalı ortamda bulunurken artan, ortamdan uzaklaşınca hafifleyen bir grup yakınmayı tanımlar.",
      "what": "Baş ağrısı, göz-boğaz irritasyonu, yorgunluk, baş dönmesi ve konsantrasyon güçlüğü görülebilir.",
      "why": "Yetersiz havalandırma, uçucu kimyasallar, nem-küf, toz ve iç ortam hava kalitesiyle ilişkili faktörler rol oynayabilir.",
      "action": "Havalandırma ve ortam koşulları kontrol edilmeli, belirtiler belirli bir binayla ilişkiliyse işyeri/ortam değerlendirmesi düşünülmelidir. Süren belirtilerde tıbbi değerlendirme alınmalıdır."
    },
    "s6": {
      "title": "Huzursuz Bacak Sendromu",
      "summary": "Özellikle dinlenme sırasında bacakları hareket ettirme isteği ve rahatsızlık hissiyle seyreden bir durumdur.",
      "what": "Belirtiler çoğunlukla akşam ve gece artar; yürümek veya bacakları hareket ettirmek geçici rahatlama sağlayabilir.",
      "why": "Demir eksikliği, bazı kronik hastalıklar, gebelik, bazı ilaçlar veya genetik yatkınlıkla ilişkili olabilir.",
      "action": "Uyku düzeni, kafein kullanımı ve demir düzeyi gibi etkenler gözden geçirilebilir. Sık veya uykuyu bozan belirtilerde hekim değerlendirmesi gerekir."
    },
    "s7": {
      "title": "İltihabi Bağırsak Hastalıkları",
      "summary": "Crohn hastalığı ve ülseratif kolit, bağırsaklarda kronik iltihapla seyreden hastalıklardır.",
      "what": "Karın ağrısı, uzun süren ishal, dışkıda kan, kilo kaybı ve yorgunluk gibi belirtiler görülebilir.",
      "why": "Genetik yatkınlık, bağışıklık sistemi ve çevresel faktörlerin birlikte rol oynadığı düşünülür.",
      "action": "Uzun süren ishal, kanlı dışkı veya açıklanamayan kilo kaybında gastroenteroloji değerlendirmesi önemlidir. Tedavi kişiye ve hastalığın şiddetine göre planlanır."
    },
    "s8": {
      "title": "Kronik Yorgunluk",
      "summary": "Haftalar veya aylar boyunca süren ve dinlenmeyle tamamen düzelmeyen yorgunluk birçok farklı nedene bağlı olabilir.",
      "what": "Enerji azalması, konsantrasyon güçlüğü, uyku sorunları ve günlük aktivitelerde zorlanma görülebilir.",
      "why": "Uyku bozuklukları, kansızlık, tiroit sorunları, enfeksiyonlar, ruhsal durumlar veya başka sağlık sorunları neden olabilir.",
      "action": "Uyku, beslenme ve günlük aktivite düzeni gözden geçirilmeli; uzun süren veya günlük yaşamı etkileyen yorgunlukta altta yatan neden için tıbbi değerlendirme yapılmalıdır."
    },
    "s9": {
      "title": "Romatoid Artrit",
      "summary": "Bağışıklık sisteminin eklemlerde iltihaba yol açtığı kronik otoimmün bir romatizmal hastalıktır.",
      "what": "El ve ayak eklemlerinde simetrik ağrı, şişlik ve uzun süren sabah tutukluğu sık görülebilir.",
      "why": "Genetik yatkınlık, bağışıklık sistemi değişiklikleri ve sigara gibi çevresel etkenler riski etkileyebilir.",
      "action": "Erken tanı eklem hasarını önlemede önemlidir. Süren eklem şişliği ve sabah tutukluğunda romatoloji değerlendirmesi alınmalıdır."
    },
    "s10": {
      "title": "Tip 2 Diyabet",
      "summary": "Vücudun insülini yeterince etkili kullanamadığı ve kan şekerinin zamanla yükseldiği metabolik bir hastalıktır.",
      "what": "Sık susama, sık idrara çıkma, yorgunluk ve bulanık görme görülebilir; bazen uzun süre belirti vermeyebilir.",
      "why": "Genetik yatkınlık, fazla kilo, hareketsizlik, yaş ve insülin direnci önemli risk faktörleridir.",
      "action": "Düzenli kan şekeri takibi, dengeli beslenme, fiziksel aktivite ve hekim kontrolleri önemlidir. Tedavi planı kişiye göre belirlenir."
    }
  },
  "en": {
    "labels": {
      "kicker": "ABOUT THIS SERVICE",
      "what": "What is it?",
      "why": "Why can it happen?",
      "action": "What can be done?",
      "note": "This content is for general information only; personal diagnosis and treatment require medical evaluation.",
      "close": "Close",
      "appointment": "Request Appointment"
    },
    "s1": {
      "title": "Ankylosing Spondylitis",
      "summary": "A chronic inflammatory rheumatic condition that mainly affects the spine and sacroiliac joints.",
      "what": "It may cause lower back or hip pain, morning stiffness and reduced mobility. Some people can also have eye or other organ involvement.",
      "why": "There is no single cause. Genetic susceptibility and an abnormal inflammatory immune response play important roles.",
      "action": "Persistent back pain and morning stiffness should be assessed. Regular movement, appropriate exercise and medical follow-up can be important."
    },
    "s2": {
      "title": "Headache & Migraine",
      "summary": "Migraine can cause recurring, often throbbing headaches with sensitivity to light or sound.",
      "what": "Attacks may last for hours and can include nausea, visual symptoms or difficulty with normal daily activity.",
      "why": "Genetics, poor sleep, stress, skipped meals, certain foods and hormonal changes may trigger attacks.",
      "action": "A headache diary, regular sleep and meals may help. A new, very severe or unusual headache requires medical assessment."
    },
    "s3": {
      "title": "Low Back & Back Pain",
      "summary": "Back pain may arise from muscles, joints, discs or structures around the spine.",
      "what": "Pain can worsen with movement, radiate to the leg, or occur with muscle spasm and reduced movement.",
      "why": "Muscle strain, prolonged sitting, mechanical overload, disc problems or rheumatic conditions may contribute.",
      "action": "Gentle movement and ergonomics can help mild cases. Weakness, numbness, bladder/bowel changes or trauma require urgent medical assessment."
    },
    "s4": {
      "title": "Fibromyalgia",
      "summary": "A chronic pain condition associated with widespread pain, tenderness, fatigue and sleep disturbance.",
      "what": "Widespread muscle and soft-tissue pain may occur with mental fatigue and unrefreshing sleep.",
      "why": "The exact cause is not fully known. Pain-processing sensitivity, sleep problems, stress and genetics may contribute.",
      "action": "Gradual exercise, good sleep and stress management can be helpful. Medical evaluation is needed to exclude other causes."
    },
    "s5": {
      "title": "Sick Building Syndrome",
      "summary": "A group of symptoms that increase in a particular indoor environment and improve after leaving it.",
      "what": "Headache, eye or throat irritation, fatigue, dizziness and concentration difficulty may occur.",
      "why": "Poor ventilation, volatile chemicals, dampness, mold, dust and indoor air quality may contribute.",
      "action": "Ventilation and environmental conditions should be reviewed. Persistent symptoms should be medically assessed."
    },
    "s6": {
      "title": "Restless Legs Syndrome",
      "summary": "A condition causing an urge to move the legs, especially during rest.",
      "what": "Symptoms often worsen in the evening or at night, and movement may bring temporary relief.",
      "why": "It may be associated with iron deficiency, some chronic diseases, pregnancy, medications or genetics.",
      "action": "Sleep habits, caffeine use and iron status can be reviewed. Frequent or sleep-disrupting symptoms should be assessed."
    },
    "s7": {
      "title": "Inflammatory Bowel Diseases",
      "summary": "Crohn’s disease and ulcerative colitis are chronic inflammatory conditions of the digestive tract.",
      "what": "Abdominal pain, prolonged diarrhea, blood in stool, weight loss and fatigue may occur.",
      "why": "Genetic susceptibility, the immune system and environmental factors are thought to interact.",
      "action": "Persistent diarrhea, bloody stool or unexplained weight loss should be evaluated by gastroenterology. Treatment depends on disease severity."
    },
    "s8": {
      "title": "Chronic Fatigue",
      "summary": "Fatigue lasting weeks or months and not fully relieved by rest can have many causes.",
      "what": "Low energy, poor concentration, sleep problems and difficulty with daily activity may occur.",
      "why": "Sleep disorders, anemia, thyroid disease, infections, mental health conditions or other illnesses may contribute.",
      "action": "Sleep, nutrition and activity patterns should be reviewed. Persistent fatigue that affects daily life deserves medical evaluation."
    },
    "s9": {
      "title": "Rheumatoid Arthritis",
      "summary": "A chronic autoimmune rheumatic disease in which the immune system causes inflammation in the joints.",
      "what": "Symmetrical pain, swelling and prolonged morning stiffness in hand and foot joints are common.",
      "why": "Genetics, immune-system changes and environmental factors such as smoking can affect risk.",
      "action": "Early diagnosis is important to reduce joint damage. Persistent swelling and morning stiffness should be assessed by rheumatology."
    },
    "s10": {
      "title": "Type 2 Diabetes",
      "summary": "A metabolic condition in which the body becomes less effective at using insulin and blood glucose rises over time.",
      "what": "Thirst, frequent urination, fatigue and blurred vision may occur, although there may be no symptoms for a long time.",
      "why": "Genetics, excess weight, inactivity, age and insulin resistance are major risk factors.",
      "action": "Blood glucose monitoring, balanced nutrition, physical activity and medical follow-up are important. Treatment is individualized."
    }
  },
  "de": {
    "labels": {
      "kicker": "ÜBER DIESE LEISTUNG",
      "what": "Was ist das?",
      "why": "Warum kann es entstehen?",
      "action": "Was kann man tun?",
      "note": "Diese Inhalte dienen nur der allgemeinen Information; Diagnose und Behandlung erfordern eine ärztliche Beurteilung.",
      "close": "Schließen",
      "appointment": "Termin anfragen"
    },
    "s1": {
      "title": "Morbus Bechterew",
      "summary": "Eine chronisch-entzündliche rheumatische Erkrankung, die vor allem Wirbelsäule und Iliosakralgelenke betreffen kann.",
      "what": "Typisch sind Schmerzen im unteren Rücken oder Becken, Morgensteifigkeit und eingeschränkte Beweglichkeit.",
      "why": "Es gibt nicht nur eine Ursache. Genetische Veranlagung und eine fehlgesteuerte Entzündungsreaktion spielen eine wichtige Rolle.",
      "action": "Anhaltende Rückenschmerzen und Morgensteifigkeit sollten abgeklärt werden. Bewegung, passende Übungen und ärztliche Kontrolle sind wichtig."
    },
    "s2": {
      "title": "Kopfschmerzen & Migräne",
      "summary": "Migräne kann wiederkehrende, häufig pulsierende Kopfschmerzen mit Licht- oder Lärmempfindlichkeit verursachen.",
      "what": "Attacken können Stunden dauern und mit Übelkeit, Sehstörungen oder Einschränkungen im Alltag einhergehen.",
      "why": "Genetik, Schlafmangel, Stress, ausgelassene Mahlzeiten, bestimmte Lebensmittel und Hormonschwankungen können Auslöser sein.",
      "action": "Ein Kopfschmerztagebuch sowie regelmäßiger Schlaf und Mahlzeiten können helfen. Neue oder sehr starke Kopfschmerzen sollten medizinisch abgeklärt werden."
    },
    "s3": {
      "title": "Kreuz- & Rückenschmerzen",
      "summary": "Rückenschmerzen können von Muskeln, Gelenken, Bandscheiben oder anderen Strukturen der Wirbelsäule ausgehen.",
      "what": "Schmerzen können bei Bewegung zunehmen, ins Bein ausstrahlen oder mit Muskelverspannung und Bewegungseinschränkung auftreten.",
      "why": "Muskelüberlastung, langes Sitzen, Fehlbelastung, Bandscheibenprobleme oder rheumatische Erkrankungen können eine Rolle spielen.",
      "action": "Leichte Bewegung und Ergonomie helfen oft. Schwäche, Taubheit, Blasen-/Darmstörungen oder Trauma erfordern eine rasche Abklärung."
    },
    "s4": {
      "title": "Fibromyalgie",
      "summary": "Eine chronische Schmerzerkrankung mit weit verbreiteten Schmerzen, Empfindlichkeit, Müdigkeit und Schlafproblemen.",
      "what": "Muskel- und Weichteilschmerzen können mit Konzentrationsproblemen und nicht erholsamem Schlaf einhergehen.",
      "why": "Die genaue Ursache ist nicht vollständig geklärt. Schmerzverarbeitung, Schlafstörungen, Stress und Genetik können beteiligt sein.",
      "action": "Langsam gesteigerte Bewegung, guter Schlaf und Stressmanagement können helfen. Andere Ursachen sollten ärztlich ausgeschlossen werden."
    },
    "s5": {
      "title": "Sick-Building-Syndrom",
      "summary": "Beschreibt Beschwerden, die in bestimmten Innenräumen zunehmen und außerhalb des Gebäudes nachlassen.",
      "what": "Kopfschmerzen, Augen- oder Halsreizung, Müdigkeit, Schwindel und Konzentrationsprobleme können auftreten.",
      "why": "Schlechte Lüftung, Chemikalien, Feuchtigkeit, Schimmel, Staub und Raumluftqualität können beitragen.",
      "action": "Lüftung und Raumklima sollten geprüft werden. Anhaltende Beschwerden sollten medizinisch abgeklärt werden."
    },
    "s6": {
      "title": "Restless-Legs-Syndrom",
      "summary": "Eine Erkrankung mit Bewegungsdrang der Beine, vor allem in Ruhe.",
      "what": "Die Beschwerden werden häufig abends oder nachts stärker und bessern sich vorübergehend durch Bewegung.",
      "why": "Eisenmangel, chronische Erkrankungen, Schwangerschaft, Medikamente oder genetische Faktoren können beteiligt sein.",
      "action": "Schlafgewohnheiten, Koffein und Eisenstatus können geprüft werden. Häufige oder schlafstörende Beschwerden sollten ärztlich abgeklärt werden."
    },
    "s7": {
      "title": "Entzündliche Darmerkrankungen",
      "summary": "Morbus Crohn und Colitis ulcerosa sind chronisch-entzündliche Erkrankungen des Verdauungstrakts.",
      "what": "Bauchschmerzen, länger anhaltender Durchfall, Blut im Stuhl, Gewichtsverlust und Müdigkeit sind möglich.",
      "why": "Genetische Veranlagung, Immunsystem und Umweltfaktoren wirken wahrscheinlich zusammen.",
      "action": "Anhaltender Durchfall, Blut im Stuhl oder ungeklärter Gewichtsverlust sollten gastroenterologisch abgeklärt werden."
    },
    "s8": {
      "title": "Chronische Müdigkeit",
      "summary": "Müdigkeit über Wochen oder Monate, die durch Ruhe nicht vollständig verschwindet, kann viele Ursachen haben.",
      "what": "Energieverlust, Konzentrationsprobleme, Schlafstörungen und Einschränkungen im Alltag können auftreten.",
      "why": "Schlafstörungen, Anämie, Schilddrüsenerkrankungen, Infektionen, psychische Belastungen oder andere Erkrankungen können beteiligt sein.",
      "action": "Schlaf, Ernährung und Aktivität sollten überprüft werden. Anhaltende, alltagsrelevante Müdigkeit sollte medizinisch abgeklärt werden."
    },
    "s9": {
      "title": "Rheumatoide Arthritis",
      "summary": "Eine chronische Autoimmunerkrankung, bei der das Immunsystem Entzündungen in den Gelenken verursacht.",
      "what": "Symmetrische Schmerzen, Schwellungen und längere Morgensteifigkeit an Hand- und Fußgelenken sind häufig.",
      "why": "Genetik, Veränderungen des Immunsystems und Umweltfaktoren wie Rauchen können das Risiko beeinflussen.",
      "action": "Eine frühe Diagnose ist wichtig, um Gelenkschäden zu reduzieren. Anhaltende Gelenkschwellung sollte rheumatologisch abgeklärt werden."
    },
    "s10": {
      "title": "Typ-2-Diabetes",
      "summary": "Eine Stoffwechselerkrankung, bei der der Körper Insulin weniger wirksam nutzt und der Blutzucker ansteigt.",
      "what": "Durst, häufiges Wasserlassen, Müdigkeit und verschwommenes Sehen können auftreten; oft bestehen lange keine Beschwerden.",
      "why": "Genetische Veranlagung, Übergewicht, Bewegungsmangel, Alter und Insulinresistenz sind wichtige Risikofaktoren.",
      "action": "Blutzuckerkontrolle, ausgewogene Ernährung, Bewegung und ärztliche Betreuung sind wichtig. Die Behandlung wird individuell geplant."
    }
  }
};


const serviceInfoModal =
    document.getElementById("serviceInfoModal");

const serviceInfoBackdrop =
    document.getElementById("serviceInfoBackdrop");

const serviceInfoClose =
    document.getElementById("serviceInfoClose");

const serviceInfoDone =
    document.getElementById("serviceInfoDone");

const serviceInfoAppointment =
    document.getElementById("serviceInfoAppointment");

const serviceInfoKicker =
    document.getElementById("serviceInfoKicker");

const serviceInfoTitle =
    document.getElementById("serviceInfoTitle");

const serviceInfoSummary =
    document.getElementById("serviceInfoSummary");

const serviceInfoWhatLabel =
    document.getElementById("serviceInfoWhatLabel");

const serviceInfoWhyLabel =
    document.getElementById("serviceInfoWhyLabel");

const serviceInfoActionLabel =
    document.getElementById("serviceInfoActionLabel");

const serviceInfoWhat =
    document.getElementById("serviceInfoWhat");

const serviceInfoWhy =
    document.getElementById("serviceInfoWhy");

const serviceInfoAction =
    document.getElementById("serviceInfoAction");

const serviceInfoNote =
    document.getElementById("serviceInfoNote");


function getCurrentServiceLanguage() {

    if (languageSelect && languageSelect.value) {
        return languageSelect.value;
    }

    return (
        localStorage.getItem("ceyhunNuriLanguage") ||
        "tr"
    );
}


function openServiceInfo(serviceKey) {

    if (!serviceInfoModal) {
        return;
    }

    const language =
        getCurrentServiceLanguage();

    const languageData =
        serviceInfoData[language] ||
        serviceInfoData.tr;

    const item =
        languageData[serviceKey];

    const labels =
        languageData.labels;

    if (!item) {
        return;
    }

    serviceInfoKicker.textContent =
        labels.kicker;

    serviceInfoTitle.textContent =
        item.title;

    serviceInfoSummary.textContent =
        item.summary;

    serviceInfoWhatLabel.textContent =
        labels.what;

    serviceInfoWhyLabel.textContent =
        labels.why;

    serviceInfoActionLabel.textContent =
        labels.action;

    serviceInfoWhat.textContent =
        item.what;

    serviceInfoWhy.textContent =
        item.why;

    serviceInfoAction.textContent =
        item.action;

    serviceInfoNote.textContent =
        labels.note;

    serviceInfoDone.textContent =
        labels.close;

    serviceInfoAppointment.textContent =
        labels.appointment;

    serviceInfoModal.classList.add("show");

    serviceInfoModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );
}


function closeServiceInfo() {

    if (!serviceInfoModal) {
        return;
    }

    serviceInfoModal.classList.remove("show");

    serviceInfoModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );
}


document.querySelectorAll(
    ".service-info-button"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            openServiceInfo(
                button.dataset.serviceInfo
            );

        }
    );

});


[
    serviceInfoBackdrop,
    serviceInfoClose,
    serviceInfoDone
].forEach(element => {

    if (element) {

        element.addEventListener(
            "click",
            closeServiceInfo
        );

    }

});


if (serviceInfoAppointment) {

    serviceInfoAppointment.addEventListener(
        "click",
        closeServiceInfo
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            serviceInfoModal &&
            serviceInfoModal.classList.contains(
                "show"
            )
        ) {

            closeServiceInfo();

        }

    }
);
