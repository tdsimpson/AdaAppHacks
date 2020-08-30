//Taylor Simpson - Ada App Hacks 2020
import AdaWidgetSDK from "@ada-support/ada-widget-sdk";
import './styles/styles.css';
import './scripts.js';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import 'font-awesome/css/font-awesome.css';

import './fonts/WoodfordBournePRO-Regular.otf';


const widgetSDK = new AdaWidgetSDK();

const containerElement = document.getElementById("widget-container");
const sdkInputElement = document.getElementById("ticket-number");
const inputElement = document.getElementById("input-field");
const submitButtonElement = document.getElementById("submit-button");
const submitMessageElement = document.getElementById("submit-message");

const status = document.getElementById("status");
const description = document.getElementById("description");

const dotOpened = document.getElementById("dotOpened");
const dotAssigned = document.getElementById("dotAssigned");
const dotInProgress = document.getElementById("dotInProgress");
const dotResolved = document.getElementById("dotResolved");
const dotClosed = document.getElementById("dotClosed");

// Used to return data to the user including adding additional ticket info.
submitButtonElement.onclick = () => {
  widgetSDK.sendUserData({
    responseData: inputElement.value
  }, (event) => {
    if (event.type === "SEND_USER_DATA_SUCCESS") {
      submitMessageElement.innerText = "Data was successfully submitted";
      submitButtonElement.disabled = true;
    } else {
      submitMessageElement.innerText = "Data submission failed, please try again";
    }
  });
};

widgetSDK.init((event) => {
  if (!widgetSDK.widgetIsActive) {
    containerElement.innerHTML = "The widget is not active";
    return;
  }

  // mapping the inputted ticket number to html
  const { inputdata } = widgetSDK.metaData;
  sdkInputElement.innerHTML = "#" + inputdata;

  // An array of ticket data. This would normally be kept in a database 
  // and managed through a UI on the other end by the customer support agent.
  const ticket = [

    {
      "id": "333444",
      "status": "4",
      "description": "Wrong t-shirt shipped to address",
      "openedMessage": "Your ticket was created via the torontotshirts.com customer support bot. \n \n Customer message: Hi, I received the wrong package from torontotshirts.com yesterday.I ordered the RIP Croc Rock shirt but received the Board Man Gets Paid shirt.While I do still love Kawhi Leonard, he is no longer on the team, and I would really like my Croc Rock Shirt.Please let me know how I can solve this mixup.",
      "assignedMessage": "Your ticket was assigned to our customer service rep, Michael.",
      "inProgressMessage": "Your message has been read and our customer service rep is now working on finding a solution.",
      "resolvedMessage": "An email has been sent to your email address to confirm that your problem has been solved. Please confirm with the customer service rep that the issue is now resolved.",
      "closedMessage": "",
      "openedTime": "July 18, 2020 at 6:14pm",
      "assignedTime": "July 26, 2020 at 9:35am",
      "inProgressTime": "July 27, 2020 at 9:45am",
      "resolvedTime": "July 30, 2020 at 11:44am",
      "closedTime": ""
    },

    {
      "id": "555666",
      "status": "2",
      "description": "Upwork account lock",
      "openedMessage": "Your ticket was created via an email to upwork@support.com. \n \n Customer message: I recently got locked out of my UpWork account. I think it’s because I didn’t verify my account within the 7 day period after that email was sent. Please let me know if you can resend that email, or if there is something else I need to do to unlock my account.",
      "assignedMessage": "Your ticket was assigned to a customer service agent.",
      "inProgressMessage": "",
      "resolvedMessage": "",
      "closedMessage": "",
      "openedTime": "August 29, 2020 at 12:24pm",
      "assignedTime": "August 30, 2020 at 4:18pm",
      "inProgressTime": "",
      "resolvedTime": "",
      "closedTime": ""
    },

    {
      "id": "777888",
      "status": "3",
      "description": "Can’t export a gif from Photoshop",
      "openedMessage": "Your ticket was created via an email to support@adobe.com. \n \n Customer message: I was trying to export a gif from Photoshop, but it crashes every time. I could use the legacy version to export, but it doesn’t allow me to export it in the dimensions I need. I need it to be 1200px by 1600px. Please let me know what I should do. Thanks.",
      "assignedMessage": "Your ticket has been assigned to Melissa for review.",
      "inProgressMessage": "Your message has been read and our customer service rep is now working on finding a solution for you.",
      "resolvedMessage": "",
      "closedMessage": "",
      "openedTime": "August 21 , 2020 at 9:33pm",
      "assignedTime": "August 23, 2020 at 12:16pm",
      "inProgressTime": "August 24, 2020 at 9:00am",
      "resolvedTime": "",
      "closedTime": ""
    },
  ]

  // An array used to conver status numbers (1-5) to status codes.
  const statusCodes = ['Opened', 'Assigned', 'In Progress', 'Resolved', 'Closed'];

  //Loops through the ticket id's and if there is a match, populate the ui with the relevant info
  for (let i = 0; i < ticket.length; i++) {
    let t = ticket[i];
    if (t.id === inputdata) {
      status.innerHTML = statusCodes[t.status - 1];
      description.innerText = t.description;

      // Mapping the messages that are displayed when you click on the status stage buttons.
      openedMessage.innerText = t.openedMessage;
      assignedMessage.innerText = t.assignedMessage;
      inProgressMessage.innerText = t.inProgressMessage;
      resolvedMessage.innerText = t.resolvedMessage;
      closedMessage.innerText = t.closedMessage;

      // Mapping the times that are relevant for each status stage
      openedTime.innerText = t.openedTime;
      assignedTime.innerText = t.assignedTime;
      inProgressTime.innerText = t.inProgressTime;
      resolvedTime.innerText = t.resolvedTime;
      closedTime.innerText = t.closedTime;

      // A dirty way to convert grey status dots to black status dots
      if (t.status >= 1) {
        dotOpened.innerHTML = "<div></div>";
      }

      if (t.status >= 2) {
        dotAssigned.innerHTML = "<div></div>";
      }

      if (t.status >= 3) {
        dotInProgress.innerHTML = "<div></div>";
      }

      if (t.status >= 4) {
        dotResolved.innerHTML = "<div></div>";
      }

      if (t.status >= 5) {
        dotClosed.innerHTML = "<div></div>";
      }
    }
  }
});