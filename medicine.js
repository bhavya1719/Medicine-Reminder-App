 const alarmSound=new Audio('alarm.mp3');
function addReminder() {
    let medicineName = document.getElementById("medicineName").value;
    let medicineTime = document.getElementById("medicineTime").value;
    let medicineColor = document.getElementById("medicineColor").value;


    if (medicineName === "" || medicineTime === "") {
        alert("Please fill all fields");
        return;
    }
    if(medicineColor ===""){
        medicineColor = "not specified";
    }
    alarmSound.play().then(()=>{
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }).catch(e=>console.log("Audio waiting for player unlock"));
    let list = document.getElementById("medicineList");
    let li = document.createElement("li");
    li.innerHTML = `
        ${medicineName} - ${medicineTime} -${medicineColor}
                <button onclick="this.parentElement.remove()">Delete</button>
    `;

    list.appendChild(li);

    checkReminder(medicineName, medicineTime,medicineColor);

    document.getElementById("medicineName").value = "";
    document.getElementById("medicineTime").value = "";
    document.getElementById("medicineColor").value="";
    
}

function checkReminder(name, time ,color) {
    setInterval(() => {
        let now = new Date();
        let currentTime =
            now.getHours().toString().padStart(2, "0") +
            ":" +
            now.getMinutes().toString().padStart(2, "0");

        if (currentTime === time) {
            alarmSound.play().catch(error=>{
                console.error("broswer blocked audio playback:",error);
            })
            speakReminder(name,color);
            clearInterval(intervalid);
        }
    }, 1000);
}

function speakReminder(name ,color) {
    let message =
        "Time to take " +
        name +
        " medicine. Please take your tablet.";
    if(color!=="not specified"){
        message +=" and it color is"+ color;
    }

    let speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}
