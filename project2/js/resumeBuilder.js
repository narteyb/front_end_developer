var bio = {
  "name": "Daniel Brown",
  "role": "Front-End Developer",
  "pictureURL": "http://www.gravatar.com/avatar/3ca9be6ba7eed01462ba079f4fdda14c.png",
  "welcomeMessage": "Hello There",
  "contacts": {
    "mobileNumber": "408-608-9815",
    "email": "nartey_brown@yahoo.com",
    "github": "@narteyb",
    "twitter": "@akasa_anomaa",
    "location": "Lathrop, CA"
  },
  "skills": ["Javascript", "CSS", "HTML", "Ruby"],
}

var education = {
  "schools": [
    {
      "name": "University of Guyana",
      "location": "Georgetown, Guyana",
      "degree": "BSc.",
      "majors": ["Mechanical Engineering"],
      "dates": {
        "from": "August 1989",
        "to": "December 1994"
      },
      "url": "http://www.uog.edu.gy/"
    },
    {
      "name": "Florida Institute of Technology",
      "location": "150 W University Blvd, Melbourne, FL 32901",
      "degree": "MSc.",
      "majors": ["Mechanical Engineering (Robotics)"],
      "dates": {
        "from": "August 2003",
        "to": "May 2005"
      },
      "url": "http://www.fit.edu"
    },
    {
      "name": "Carnegie Mellon Univeristy",
      "location": "NASA Ames Research Park, Moffett Field, CA 94035-0001",
      "degree": "MSc.",
      "majors": ["Software Engineering"],
      "dates": {
        "from": "August 2012",
        "to": "August 2014"
      },
      "url": "http://www.cmu.edu/silicon-valley/"
    }
  ],
  "onlineCourses": [
    {
      "title": "Control of Mobile Robots",
      "school": "Coursera",
      "dates": {
        "from": "January 28, 2014",
        "to": "March 17, 2014"
      },
      "url": "https://www.coursera.org/course/conrob"
    },
    {
      "title": "Introduction to Databases",
      "school": "Stanford Online",
      "dates": {
        "from": "January 11, 2013",
        "to": "March 27, 2013"
      },
      "url": "https://class.stanford.edu/courses/Home/Databases/Engineering/about"
    }
  ]
};

var work = {
  "jobs": [
    {
      "employer": "Accuray Inc.",
      "title": "Robotics Engineer",
      "location": "1310 Chesapeake Ter, Sunnyvale, CA",
      "dates": {
        "from": "July, 2005",
        "to": "February, 2014"
      },
      "description": "Robot Workspace Analysis"
    },
    {
      "employer": "Tobi Inc.",
      "title": "Snr. Software Engineer",
      "location": "120 Linden Avenue, Oakland, CA",
      "dates": {
        "from": "March, 2014",
        "to": "Current"
      },
      "description": "Building Web-based tools for Iventory management"
    }
  ]
};

var projects = {
  "projects": [
    {
      "title": "RomiboWeb",
      "dates":{
        "from": "January, 2014",
        "to": "April, 2014"
      },
      "description": "Project about ...",
      "images": ["images/romiboweb.jpg"]
    },
    {
      "title": "Funcationer",
      "dates":{
        "from": "January, 2014",
        "to": "April, 2014"
      },
      "description": "Project about ...",
      "images": ["images/monument.jpg"]
    },
    {
      "title": "FowlerRoots",
      "dates":{
        "from": "January, 2014",
        "to": "April, 2014"
      },
      "description": "Project about ...",
      "images": ["images/stones.jpg"]
    }
  ]
}



function datesToString(dates){
  return dates.from + ' - ' + dates.to;
}

bio.display = function (){
  var formattedName = HTMLheaderName.replace("%data%", bio.name);
  var formattedRole = HTMLheaderRole.replace("%data%", bio.role);

  $("#header").prepend(formattedRole);
  $("#header").prepend(formattedName);

  var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobileNumber);
  $('#topContacts').append(formattedMobile);
  var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
  $('#topContacts').append(formattedEmail);
  var formattedGitHub = HTMLgithub.replace("%data%", bio.contacts.github);
  $('#topContacts').append(formattedEmail);
  var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
  $('#topContacts').append(formattedTwitter);
  var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
  $('#topContacts').append(formattedLocation);
  var formattedBioPic = HTMLbioPic.replace("%data%", bio.pictureURL);
  $('#header').append(formattedBioPic);

  if (bio.skills.length > 0){
    $('#header').append(HTMLskillsStart);
    var formattedSkill;
    for (var i = 0; i < bio.skills.length; i++){
      formattedSkill = HTMLskills.replace("%data%", bio.skills[i]);
      $("#skills").append(formattedSkill);
    }
  }
}

education.display = function(){
  for (schoolIndex in education.schools){
    $('#education').append(HTMLschoolStart);
    var school = education.schools[schoolIndex];
    var formattedSchoolName = HTMLschoolName.replace("%data%", school.name);
    $(".education-entry:last").append(formattedSchoolName);
    var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", school.degree);
    $(".education-entry:last").append(formattedSchoolDegree);
    var dateRange = school.dates.from + ' - ' + school.dates.to;
    var formattedDates = HTMLworkDates.replace("%data%", dateRange);
    $(".education-entry:last").append(formattedDates);
    var formattedLocation = HTMLschoolLocation.replace("%data%", school.location);
    $(".education-entry:last").append(formattedLocation);
    var formattedMajor = HTMLschoolMajor.replace("%data%", school.majors.join());
    $(".education-entry:last").append(formattedMajor);
  }

  //online courses
  $('#education').append(HTMLonlineClasses);
  for (onlineCourseIndex in education.onlineCourses){
    var onlineCourse = education.onlineCourses[onlineCourseIndex];
    $('#education').append(HTMLschoolStart);
    var formattedOnlineTitle =  HTMLonlineTitle.replace("%data%", onlineCourse.title);
    var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", onlineCourse.school);
    var formattedTitleAndSchool = formattedOnlineTitle + formattedOnlineSchool;
    $(".education-entry:last").append(formattedTitleAndSchool);
    var formattedOnlineDate = HTMLonlineDates.replace("%data%", datesToString(onlineCourse.dates));
    $(".education-entry:last").append(formattedOnlineDate);
    var formattedURL = HTMLonlineURL.replace("%data%", onlineCourse.url);
    $(".education-entry:last").append(formattedURL);
  }
}

work.display = function (){
  for (jobIndex in work.jobs){
    $("#workExperience").append(HTMLworkStart);
    var jobItem = work.jobs[jobIndex];
    var formattedEmployer = HTMLworkEmployer.replace("%data%", jobItem.employer);
    var formattedTitle = HTMLworkTitle.replace("%data%", jobItem.title);
    var formattedEmployerTitle = formattedEmployer + formattedTitle;
    $(".work-entry:last").append(formattedEmployerTitle);

    var dateRange = jobItem.dates.from + ' - ' + jobItem.dates.to;
    var formattedDates = HTMLworkDates.replace("%data%", dateRange);
    $(".work-entry:last").append(formattedDates);

    var formattedDescription = HTMLworkDescription.replace("%data%", jobItem.description);
    $(".work-entry:last").append(formattedDescription);
  }
}

projects.display = function (){
  for (projectIndex in projects.projects){
    $('#projects').append(HTMLprojectStart);
    var project = projects.projects[projectIndex];
    var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
    $('.project-entry:last').append(formattedTitle);
    var dateRange = project.dates.from + ' - ' + project.dates.to;
    var formattedDates = HTMLprojectDates.replace("%data%", dateRange);
    $('.project-entry:last').append(formattedDates);
    var formattedDescription = HTMLprojectDescription
                                .replace("%data%", project.description);

    $('.project-entry:last').append(formattedDescription);

    if (project.images.length > 0){
      for (imageIndex in project.images){
        var formattedImage = HTMLprojectImage
          .replace("%data%", project.images[imageIndex]);
        $('.project-entry:last').append(formattedImage);
      }
    }
  }
}

function locationizer(work){
  var locations = [];
  for (var jobIndex in work.jobs){
    var jobItem = jobItem;
    var jobLocation = jobItem.location;
    locations.push(jobLocation);
  }

  return locations;
}

function inName(oldName){
  var finalName = oldName;
  // Your code goes here!

  var names = oldName.trim().split(" ");
  var firstName = names[0][0].toUpperCase() + names[0].slice(1).toLowerCase();
  var lastName  = names[1].toUpperCase();

  finalName = firstName + " " + lastName;
  return finalName;
}

bio.display();
work.display();
projects.display();
education.display();

//$('#main').append(internationalizationButton);
