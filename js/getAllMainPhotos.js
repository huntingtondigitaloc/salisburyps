$(document).ready(createContentful());

function createContentful() {
  var client = contentful.createClient({
    space: "f6vd1smd4uhx",
    accessToken: "9NahCyZJlmnuRWhqhWzc7_jBtgBLKx6kwX1M5jvkqdw",
  });

  if (window.location.hash) {
    // CALL API TO GET SPECIFIED PATIENT'S INFO PER CONTENTFUL ID
    const hash = window.location.hash.substring(1);

    client
      .getEntry(hash)
      .then(function (entry) {
        console.log("entry", entry);
        const patientProcedure = entry.fields.procedure;
        const patientAge = entry.fields.age;
        const patientGender = entry.fields.gender;
        const patientEthnicity = entry.fields.ethnicity;
        const patientHeight = entry.fields.height;
        const patientWeight = entry.fields.weight;
        const patientID = entry.fields.id;
        const patientPhotosAll = entry.fields.photos;
        const patientDetails = entry.fields.details;
        const patientDesc = entry.fields.patientDescription;
        console.log("patient id:", patientID);

        const mainRow = $(".main-all-photos-page");
        mainRow.addClass("individual-photos-bg-white");

        const colxs12 = $("<div class='col-xs-12'>");
        const photoContentsWrapper = $(
          "<div class='text-middle photos-content-wrapper'>"
        );
        const clientDetailsHeader = $(
          '<h3><span class="id-color photos-header">Client Details</span></h3>'
        );
        const clientDesc = $('<p class="client-bio">');
        clientDesc.text(patientDesc);

        photoContentsWrapper.append(clientDetailsHeader, clientDesc);
        colxs12.append(photoContentsWrapper);
        mainRow.append(colxs12);

        const colmd6 = $('<div class="col-xs-12 col-sm-6">');
        const expandGroup = $(
          '<div class="expand-group individual-photos-dropdown">'
        );
        const expand = $('<div class="expand">');
        const expand2 = $('<div class="expand">');
        const patientInfoHeader = $(
          '<h4 class="individual-photos-header">Patient Information</h4>'
        );
        const hiddenContent = $(
          '<div class="hidden-content patient-hidden-content">'
        );

        const photosAgeP = $('<p class="photos-age">Age: </p>');
        const photosGenderP = $('<p class="photos-gender">Gender: </p>');
        const photosEthnicityP = $(
          '<p class="photos-ethnicity">Ethnicity: </p>'
        );
        const photosHeightP = $('<p class="photos-height">Height: </p>');
        const photosWeightP = $('<p class="photos-weight">Weight: </p>');

        const ageSpan = $('<span class="photos-age-span"></span>');
        const genderSpan = $('<span class="photos-gender-span"></span>');
        const eSpan = $('<span class="photos-ethnicity-span"></span>');
        const heightSpan = $('<span class="photos-height-span"></span>');
        const weightSpan = $('<span class="photos-weight-span"></span>');

        ageSpan.text(patientAge);
        genderSpan.text(patientGender);
        eSpan.text(patientEthnicity);
        heightSpan.text(patientHeight);
        weightSpan.text(patientWeight + " lbs");

        photosAgeP.append(ageSpan);
        photosGenderP.append(genderSpan);
        photosEthnicityP.append(eSpan);
        photosHeightP.append(heightSpan);
        photosWeightP.append(weightSpan);

        hiddenContent.append(
          photosAgeP,
          photosGenderP,
          photosEthnicityP,
          photosHeightP,
          photosWeightP
        );
        expand.append(patientInfoHeader, hiddenContent);
        expandGroup.append(expand);
        colmd6.append(expandGroup);
        mainRow.append(colmd6);

        const procedureInfoHeader = $(
          '<h4 class="individual-photos-header">Procedure Details</h4>'
        );
        const hiddenProceduresContentDiv = $(
          '<div class="hidden-content hidden-procedures-loop">'
        );

        // Loop through patient details and create list items to display on DOM
        let patientArr = patientDetails.replace(//g, "•").split("/[•,/ ]/");
        // split('/[•,\/ ]/')

        for (var i = 0; i < patientArr.length; i++) {
          let listItem = $(
            "<p class='individual-photos-procedure-content'></p>"
          ).text(patientArr[i]);
          hiddenProceduresContentDiv.append(listItem);
        }

        expand2.append(procedureInfoHeader, hiddenProceduresContentDiv);
        expandGroup.append(expand2);

        const photosProfileWrapper = `<div class="col-xs-12 col-sm-6 individual-profile-wrapper">
                                        <div class="individual-profile-details-container">
                                            <p class="individual-profile-name">Dr. Ekstrom</p>
                                            <p class="individual-profile-title">Medical Director</p>
                                            <p class="individual-profile-phone">
                                                <a href="tel:+15087554825">508.755.4825</a>
                                            </p>
                                        </div>
                                        <div class="individual-profile-photo-container">
                                            <img src="../images-bunkis/team/ekstrom.jpg" alt="dr deborah ekstrom headshot">
                                        </div>
                                    </div>`;
        mainRow.append(photosProfileWrapper);

        // Loop through photos array and create entire photos divs
        splitArrayByGroups = (inputArr, splitNum) => {
          var index = 0;
          var arrayLength = inputArr.length;
          var tempArr = [];

          for (index = 0; index < arrayLength; index += splitNum) {
            newArr = inputArr.slice(index, index + splitNum);
            tempArr.push(newArr);
          }

          return tempArr;
        };

        const photosDiv = $('<div class="container">');
        const photosRow = $('<div class="row photos-row">');
        let photosArr = [];

        patientPhotosAll.forEach((item) => {
          photosArr.push(item.fields.file.url);
        });

        const resultArr = splitArrayByGroups(photosArr, 2);

        for (i = 0; i < resultArr.length; i++) {
          const photosColDiv = $(
            "<div class='col-xs-12 col-md-8 col-md-offset-2 photos-col'>"
          );
          const textMiddleDiv = $("<div class='text-middle'>");
          const twentyTwentyContainer = $("<div class='flex-container'>");
          const image1 = $(
            "<img alt='dr bunkis before after photo' class='img-responsive individual-image-50-width' />"
          );
          const image2 = $(
            "<img alt='dr bunkis before after photo' class='img-responsive individual-image-50-width' />"
          );

          image1.attr("src", resultArr[i][0]);
          image2.attr("src", resultArr[i][1]);

          twentyTwentyContainer.append(image1, image2);
          textMiddleDiv.append(twentyTwentyContainer);
          photosColDiv.append(textMiddleDiv);
          // photosRow.append(photosColDiv);
          // photosDiv.append(photosRow);
          // mainRow.append(photosDiv)
          mainRow.append(photosColDiv);
        }

        // attach click handler to patient info and procedure details
        patientInfoHeader.click(() => {
          $(".patient-hidden-content").toggleClass("hidden-content-active");
        });

        procedureInfoHeader.click(() => {
          $(".hidden-procedures-loop").toggleClass("hidden-content-active");
        });
      })
      .then(() => {
        $(".twentytwenty-container").imagesLoaded(() => {
          $(".twentytwenty-container").twentytwenty();
          console.log("2");
        });
      });
  } else {
    // CALL API FOR ALL PATIENTS FOR SPECIFIED PROCEDURE

    const pageTitle = $(".header-title").text();
    client
      .getEntries({
        "fields.procedure": pageTitle,
        content_type: "patient",
      })
      .then(function (entries) {
        entries.items.forEach(function (entry) {
          // debugger;
          const mainRow = $(".main-all-photos-page");
          const allPhotosRow = $(".all-photos-row");
          const mainColDivTest = $(
            "<div class='col-xs-12 col-md-6 photos-col photos-col-test photos-col-horizontal wow fadeInUp animated' wow-delay='0s'>"
          );
          const mainImgContainer = $("<div class='main-img-container'>");
          const mainColDiv = $(
            "<div class='col-xs-12 col-sm-6 col-md-4 photos-col wow fadeInUp animated' wow-delay='0s'>"
          );
          const textMiddleDiv = $("<div class='text-middle'>");
          const twentyTwentyContainer = $(
            "<div class='twentytwenty-container'>"
          );

          const photoContentsWrapper = $(
            "<div class='text-middle photos-content-wrapper'>"
          );
          const photoHeaderH3 = $("<h3>");
          const photoHeaderSpan = $("<span class='id-color photos-header'>");
          const photoContentsFlexRow = $(
            "<div class='photos-content-flex-row'>"
          );
          const photoContentsLeft = $("<div class='photos-content-left'>");
          const photoContentsRight = $("<div class='photos-content-right'>");

          const photosAgeP = $("<p class='photos-age'>Age: </p>");
          const photosGenderP = $("<p class='photos-gender'>Gender: </p>");
          const photosEthnicityP = $(
            "<p class='photos-ethnicity'>Ethnicity: </p>"
          );
          const photosHeightP = $("<p class='photos-height'>Height: </p>");
          const photosWeightP = $("<p class='photos-weight'>Weight: </p>");
          const viewDetailsBtn = $(
            "<a class='btn-line facelift-url-btn'>View Details</a>"
          );

          const ageSpan = $("<span class='main-photos-age-span'></span>");
          const genderSpan = $("<span class='main-photos-gender-span'></span>");
          const ethnicitySpan = $(
            "<span class='main-photos-ethnicity-span'></span>"
          );
          const heightSpan = $("<span class='main-photos-height-span'></span>");
          const weightSpan = $("<span class='main-photos-weight-span'></span>");

          const patientProcedure = entry.fields.procedure;
          const patientPhoto1 = entry.fields.photos[0].fields.file.url;
          const patientPhoto2 = entry.fields.photos[1].fields.file.url;
          const patientAge = entry.fields.age;
          const patientGender = entry.fields.gender;
          const patientEthnicity = entry.fields.ethnicity;
          const patientHeight = entry.fields.height;
          const patientWeight = entry.fields.weight;
          const patientID = entry.fields.id;
          const patientPhotosAll = entry.fields.photos;
          const contentID = entry.sys.id;
          console.log(entry);

          const containerFluid = $("<div class='container-fluid'>");
          const fluidRow = $("<div class='row photos-fluid-row'>");
          const photoColHorizontalLeft = $(
            "<div class='col-sm-12 col-md-6 photos-col-horizontal photos-col-horizontal-text wow fadeInUp animated' wow-delay='0s'>"
          );
          const photoColHorizontalRight = $(
            "<div class='col-sm-12 col-md-6 photos-col-horizontal photos-col-horizontal-tablet-small wow fadeInUp animated' wow-delay='0s'>"
          );

          // ----------- SECOND TEST horizontal------------- //
          // mainRow.append(mainColDivTest);
          mainRow.append(photoColHorizontalLeft, photoColHorizontalRight);
          photoColHorizontalLeft.append(mainImgContainer);

          photoColHorizontalRight.append(photoContentsWrapper);
          photoContentsWrapper.append(photoHeaderH3);
          photoHeaderH3.append(photoHeaderSpan);
          photoHeaderSpan.text(patientProcedure);

          // ----------- END SECOND TEST horizontal------------- //

          // TEST //
          // mainRow.append(mainColDivTest);
          // mainColDivTest.append(mainImgContainer);
          // mainColDivTest.append(photoContentsWrapper);
          // photoContentsWrapper.append(photoHeaderH3);
          // photoHeaderH3.append(photoHeaderSpan);
          // photoHeaderSpan.text(patientProcedure);
          // TEST END //

          // mainRow.append(mainColDiv);
          // mainColDiv.append(textMiddleDiv);
          // textMiddleDiv.append(twentyTwentyContainer);
          // mainColDiv.append(photoContentsWrapper);
          // photoContentsWrapper.append(photoHeaderH3);
          // photoHeaderH3.append(photoHeaderSpan);
          // photoHeaderSpan.text(patientProcedure);

          viewDetailsBtn.attr("id", patientID);

          photoContentsWrapper.append(photoContentsFlexRow);

          photoContentsFlexRow.append(photoContentsLeft);
          photoContentsLeft.append(photosAgeP, photosGenderP, photosEthnicityP);

          ageSpan.text(patientAge);
          photosAgeP.append(ageSpan);

          genderSpan.text(patientGender);
          photosGenderP.append(genderSpan);

          ethnicitySpan.text(patientEthnicity);
          photosEthnicityP.append(ethnicitySpan);

          photoContentsFlexRow.append(photoContentsRight);
          photoContentsRight.append(photosHeightP, photosWeightP);

          heightSpan.text(patientHeight);
          photosHeightP.append(heightSpan);

          weightSpan.text(patientWeight + " lbs");
          photosWeightP.append(weightSpan);

          photoContentsWrapper.append(viewDetailsBtn);

          viewDetailsBtn.attr("name", patientProcedure);

          viewDetailsBtn.on("click", function () {
            window.open(window.location.href + "#" + contentID);
          });

          const image1 = $(
            "<img alt='dr bunkis before after photo' class='img-responsive' />"
          );
          const image2 = $(
            "<img alt='dr bunkis before after photo' class='img-responsive' />"
          );
          image1.attr("src", patientPhoto1);
          image2.attr("src", patientPhoto2);
          twentyTwentyContainer.append(image1, image2);

          // TEST STUFF
          // const testImage1 = $("<img class='show-all-patients-img' alt='ocps before photo' >");
          // const testImage2 = $("<img class='show-all-patients-img' alt='ocps before photo' >");
          // testImage1.attr("src", patientPhoto1);
          // testImage2.attr("src", patientPhoto2);
          // mainImgContainer.append(testImage1, testImage2);
          // END TEST STUFF

          // SECOND TEST STUFF ----------- //
          const testImage1 = $(
            "<img class='show-all-patients-img' alt='ocps before photo' >"
          );
          const testImage2 = $(
            "<img class='show-all-patients-img' alt='ocps before photo' >"
          );
          testImage1.attr("src", patientPhoto1);
          testImage2.attr("src", patientPhoto2);
          mainImgContainer.append(testImage1, testImage2);
          // SECOND END TEST STUFF -------- //
        });
      })
      .then(() => {
        $(".twentytwenty-container").imagesLoaded(() => {
          $(".twentytwenty-container").twentytwenty();
          console.log("2");
        });
      });
  }
}

// function fetchMainPhotos() {
//   if (window.location.hash) {
//     console.log('hashed, go that id')
//     const hash = window.location.hash.substring(1);
//     console.log(hash)
//     $.ajax({
//       url:
//         "/php/getpatientinfo.php",
//       dataType: "json",
//       type: "get",
//       data: {
//         id: hash
//       },
//       success: resp => {
//         console.log('hashed response', resp)

//       }
//     });

//   } else {
//     const title = $('.header-title').text();
//     var input = title
//     var procedure = input.replace(/\w+/g, function(txt) {
//         return txt.charAt(0).toLowerCase() + txt.substr(1);
//     }).replace(/\s/g, '');
//     console.log(procedure)

//     $.ajax({
//       url:
//         "/php/getprocedurephoto.php",
//       dataType: "json",
//       type: "get",
//       data: {
//         procedure: procedure
//       },
//       success: resp => {
//         console.log('non hashed response', resp)
//         for (i = 0; i < resp.patients.length; i++) {
//           const mainRow = $(".main-all-photos-page");
//           const mainColDiv = $("<div class='col-xs-12 col-sm-6 col-md-4 photos-col wow fadeInUp animated' wow-delay='0s'>");
//           const textMiddleDiv = $("<div class='text-middle'>");
//           const twentyTwentyContainer = $("<div class='twentytwenty-container'>");

//           const photoContentsWrapper = $("<div class='text-middle photos-content-wrapper'>");
//           const photoHeaderH3 = $("<h3>");
//           const photoHeaderSpan = $("<span class='id-color photos-header'>");
//           const photoContentsFlexRow = $("<div class='photos-content-flex-row'>");
//           const photoContentsLeft = $("<div class='photos-content-left'>");
//           const photoContentsRight = $("<div class='photos-content-right'>");

//           const image1 = $("<img alt='dr bunkis before after photo' class='img-responsive' />");
//           const image2 = $("<img alt='dr bunkis before after photo' class='img-responsive' />");

//           const photosAgeP = $("<p class='photos-age'>Age: <span class='main-photos-age-span'></span></p>");
//           const photosGenderP = $("<p class='photos-gender'>Gender: <span class='main-photos-gender-span'></span></p>");
//           const photosEthnicityP = $("<p class='photos-ethnicity'>Ethnicity: <span class='main-photos-ethnicity-span'></span></p>");
//           const photosHeightP = $("<p class='photos-height'>Height: <span class='main-photos-height-span'></span></p>");
//           const photosWeightP = $("<p class='photos-weight'>Weight: <span class='main-photos-weight-span'></span> lbs</p>");
//           const photosID = $("<p class='photos-id'>Gallery ID: <span class='main-photos-id-span'></span></p>");
//           const viewDetailsBtn = $("<a class='btn-line go-to-patient'>View Details</a>");

//           let patientID = resp.patients[i].id;
//           let patientProcedure = resp.patients[i].procedure;
//           let patientPhoto1 = resp.patients[i].photos[0].pic1;
//           let patientPhoto2 = resp.patients[i].photos[0].pic2;
//           let patientAge = resp.patients[i].age;
//           let patientGender = resp.patients[i].gender;
//           let patientEthnicity = resp.patients[i].ethnicity;
//           let patientHeight = resp.patients[i].height;
//           let patientWeight = resp.patients[i].weight;
//           let patientUrl = resp.patients[i].url;

//           mainRow.append(mainColDiv);
//           mainColDiv.append(textMiddleDiv);
//           textMiddleDiv.append(twentyTwentyContainer);
//           twentyTwentyContainer.append(image1, image2);
//           mainColDiv.append(photoContentsWrapper);
//           photoContentsWrapper.append(photoHeaderH3);
//           photoHeaderH3.append(photoHeaderSpan);
//           photoHeaderSpan.text(patientProcedure);

//           image1.attr("src", patientPhoto1);
//           image2.attr("src", patientPhoto2);

//           photoContentsWrapper.append(photoContentsFlexRow);

//           photoContentsFlexRow.append(photoContentsLeft);
//           photoContentsLeft.append(photosAgeP, photosGenderP, photosEthnicityP);
//           $('.main-photos-age-span').text(patientAge);
//           $('.main-photos-gender-span').text(patientGender);
//           $('.main-photos-ethnicity-span').text(patientEthnicity);

//           photoContentsFlexRow.append(photoContentsRight);
//           photoContentsRight.append(photosHeightP, photosWeightP, photosID);
//           $('.main-photos-height-span').text(patientHeight);
//           $('.main-photos-weight-span').text(patientWeight);
//           $('.main-photos-id-span').text(patientID);

//           photoContentsWrapper.append(viewDetailsBtn);
//           viewDetailsBtn.attr("href", patientUrl);
//           viewDetailsBtn.attr("id", patientID);
//           viewDetailsBtn.on('click', function() {
//             window.open(window.location.href + '#' + patientID);
//           })
//         }
//       }
//     });
//   }
// }
