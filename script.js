function generateResume() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var name = ((_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.value) || '';
    var profession = ((_b = document.getElementById("profession")) === null || _b === void 0 ? void 0 : _b.value) || '';
    var email = ((_c = document.getElementById("email")) === null || _c === void 0 ? void 0 : _c.value) || '';
    var phone = ((_d = document.getElementById("phone")) === null || _d === void 0 ? void 0 : _d.value) || '';
    var address = ((_e = document.getElementById("address")) === null || _e === void 0 ? void 0 : _e.value) || '';
    var about = ((_f = document.getElementById("about")) === null || _f === void 0 ? void 0 : _f.value) || '';
    var education = ((_g = document.getElementById("education")) === null || _g === void 0 ? void 0 : _g.value) || '';
    var experience = ((_h = document.getElementById("experience")) === null || _h === void 0 ? void 0 : _h.value) || '';
    var languages = ((_j = document.getElementById("languages")) === null || _j === void 0 ? void 0 : _j.value.split(",")) || [];
    var skills = ((_k = document.getElementById("skills")) === null || _k === void 0 ? void 0 : _k.value.split(",")) || [];
    var profileImage = (_m = (_l = document.getElementById("profile-image")) === null || _l === void 0 ? void 0 : _l.files) === null || _m === void 0 ? void 0 : _m[0];
    var resumeSection = document.getElementById("resume");
    var profileImageURL = 'default-profile-image.jpg';
    if (profileImage) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profileImageURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            displayResume();
        };
        reader.readAsDataURL(profileImage);
    }
    else {
        displayResume();
    }
    function displayResume() {
        var _a, _b;
        if (resumeSection) {
            resumeSection.innerHTML = "\n                <div class=\"resume\">\n                    <div class=\"sidebar\">\n                        <img src=\"".concat(profileImageURL, "\" alt=\"Profile Picture\" class=\"profile-img\">\n                        <h2>").concat(name, "</h2>\n                        <p><strong>").concat(profession, "</strong></p>\n\n                        <h3>About</h3>\n                        <p>").concat(about.replace(/\n/g, "<br>"), "</p>\n\n                        <h3>Contact</h3>\n                        <p><i class=\"fas fa-phone\"></i> ").concat(phone, "</p>\n                        <p><i class=\"fas fa-envelope\"></i> ").concat(email, "</p>\n                        <p><i class=\"fas fa-map-marker-alt\"></i> ").concat(address, "</p>\n\n                        <h3>Education</h3>\n                        <p>").concat(education.replace(/\n/g, "<br>"), "</p>\n\n                        <h3>Skills</h3>\n                        <ul>").concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "</ul>\n                    </div>\n                    <div class=\"main-content\">\n                        <h3>Experience</h3>\n                        <p>").concat(experience.replace(/\n/g, "<br>"), "</p>\n\n                        <h3>Languages</h3>\n                        <ul>").concat(languages.map(function (language) { return "<li>".concat(language.trim(), "</li>"); }).join(''), "</ul>\n                    </div>\n                    <div class=\"actions\">\n                        <button id=\"share-resume\" class=\"button\">Shareable Resume</button>\n                        <button id=\"download-pdf\" class=\"button\">Download PDF</button>\n                    </div>\n                </div>\n            ");
        }
        toggleButtons(true);
        toggleFormInputs(false);
        (_a = document.getElementById("share-resume")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", shareResume);
        (_b = document.getElementById("download-pdf")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", printResume);
    }
    function shareResume() {
        var urlParams = new URLSearchParams({
            name: name,
            profession: profession,
            email: email,
            phone: phone,
            address: address,
            about: about,
            education: education,
            experience: experience,
            languages: languages.join(","), skills: skills.join(","),
        });
        var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?").concat(urlParams.toString());
        alert("Shareable Resume Link: ".concat(shareableURL));
    }
    function printResume() {
        var _a;
        var resumeContent = (_a = document.querySelector('.resume')) === null || _a === void 0 ? void 0 : _a.innerHTML;
        var printWindow = window.open('', '_blank');
        printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write("\n            <html>\n                <head>\n                    <title>Resume</title>\n                    <style>\n                        /* Add basic styles for printing */\n                        .resume { font-family: Arial, sans-serif; margin: 20px  ; }\n                        .sidebar { width: 30%; float: left; padding: 10px; }\n                        .main-content { width: 70%; float: left; padding: 10px; }\n                        .profile-img { width: 100%; height: auto; border-radius: 50%; }\n                        ul { list-style-type: disc; margin: 0; padding: 0; }\n                        li { margin: 5px 0; }\n                     </style>\n                </head>\n                <body>\n                    <div class=\"resume\">".concat(resumeContent, "</div>\n                    <script>\n                        window.print();\n                        window.onafterprint = function() { window.close(); };\n                    </script>\n                </body>\n            </html>\n        "));
    }
}
function toggleFormInputs(enable) {
    var inputs = document.querySelectorAll('#resume-form input, #resume-form textarea');
    inputs.forEach(function (input) {
        input.disabled = !enable;
    });
}
function toggleButtons(isGenerated) {
    document.getElementById("generate-button").style.display = isGenerated ? 'none' : 'block';
    document.getElementById("edit-button").style.display = isGenerated ? 'block' : 'none';
}
function editResume() {
    toggleFormInputs(true);
    toggleButtons(false);
}
document.addEventListener("DOMContentLoaded", function () {
    var _a, _b;
    (_a = document.getElementById("generate-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", generateResume);
    (_b = document.getElementById("edit-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", editResume);
});
