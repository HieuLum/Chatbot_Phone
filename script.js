var audio = new Audio('assets/sentmessage.mp3');
// Hàm khởi tạo khi tải trang
function startFunction() {
    setLastSeen();
    waitAndResponce("intro");
} 

// Gọi hàm khởi tạo khi trang web load
window.onload = startFunction;

// Cập nhật last seen khi có tin nhắn
function setLastSeen() {
    var date = new Date();
    var lastSeen = document.getElementById("lastseen");
    lastSeen.innerText = "last seen today at " + date.getHours() + ":" + date.getMinutes();
} 


function closeFullDP() {
    var x = document.getElementById("fullScreenDP");
    if (x.style.display === 'flex') {
        x.style.display = 'none';
    } else {
        x.style.display = 'flex';
    }
}

function openFullScreenDP() {
    var x = document.getElementById("fullScreenDP");
    if (x.style.display === 'flex') {
        x.style.display = 'none';
    } else {
        x.style.display = 'flex';
    }
}


function isEnter(event) {
    if (event.keyCode == 13) {
        sendMsg();
    }
}

// Cập nhật hàm sendMsg để gọi API từ backend FastAPI
function sendMsg() {
    var input = document.getElementById("inputMSG");
    var ti = input.value.trim();
    if (ti === "") {
        return;
    }

    var date = new Date();
    var myLI = document.createElement("li");
    var myDiv = document.createElement("div");
    var greendiv = document.createElement("div");
    var dateLabel = document.createElement("label");
    dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
    myDiv.setAttribute("class", "sent");
    greendiv.setAttribute("class", "green");
    dateLabel.setAttribute("class", "dateLabel");
    greendiv.innerText = input.value;
    myDiv.appendChild(greendiv);
    myLI.appendChild(myDiv);
    greendiv.appendChild(dateLabel);
    document.getElementById("listUL").appendChild(myLI);
    var s = document.getElementById("chatting");
    s.scrollTop = s.scrollHeight;
    input.value = "";
    playSound();

    // Gọi API FastAPI
    fetch('https://moving-pleasant-bee.ngrok-free.app/ask/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "question": ti })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        sendTextMessage(data.answer || "No response from server");
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        sendTextMessage("Vui lòng liên hệ qua hotline để được hỗ trợ");
    });
}


function waitAndResponce(inputText) {
    var lastSeen = document.getElementById("lastseen");
    lastSeen.innerText = "typing...";
    
    switch (inputText.toLowerCase().trim()) {
        // Mở đầu chatbot
        case "intro":
            setTimeout(() => {
                sendTextMessage(
                    "Xin chào 👋🏻, Chào mừng bạn đến với <span class='bold'>Hiếu Lủm</span> – Nơi mua sắm điện thoại uy tín, chất lượng! 📱✨<br><br>" +
                    "Tôi là <span class='bold'>Chatbot Hỗ Trợ Khách Hàng</span>, sẵn sàng giúp bạn:<br>" +
                    "- 📊 Tìm kiếm thông tin chi tiết về cấu hình điện thoại.<br>" +
                    "- 💰 Cập nhật giá bán mới nhất và các khuyến mãi hấp dẫn.<br>" +
                    "- 🌟 Tư vấn các tính năng nổi bật phù hợp với nhu cầu của bạn.<br>" +
                    "- 🔄 So sánh các mẫu điện thoại để bạn dễ dàng lựa chọn.<br><br>" +
                    "Hãy nhập câu hỏi ngay về mẫu điện thoại bạn quan tâm! 🚀📲"
                );
            }, 2000);
            break;
    
    }    
}

function clearChat() {
    document.getElementById("listUL").innerHTML = "";
    waitAndResponce('intro');
}

// Cập nhật hàm sendTextMessage để hiển thị tin nhắn từ API
function sendTextMessage(textToSend) {
    setTimeout(setLastSeen, 1000);
    var date = new Date();
    var myLI = document.createElement("li");
    var myDiv = document.createElement("div");
    var greendiv = document.createElement("div");
    var dateLabel = document.createElement("label");
    dateLabel.setAttribute("id", "sentlabel");
    dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
    myDiv.setAttribute("class", "received");
    greendiv.setAttribute("class", "grey");
    greendiv.innerHTML = textToSend;
    myDiv.appendChild(greendiv);
    myLI.appendChild(myDiv);
    greendiv.appendChild(dateLabel);
    document.getElementById("listUL").appendChild(myLI);
    var s = document.getElementById("chatting");
    s.scrollTop = s.scrollHeight;
    playSound();
}


function sendResponse() {
    setTimeout(setLastSeen, 1000);
    var date = new Date();
    var myLI = document.createElement("li");
    var myDiv = document.createElement("div");
    var greendiv = document.createElement("div");
    var dateLabel = document.createElement("label");
    dateLabel.innerText = date.getHours() + ":" + date.getMinutes();
    myDiv.setAttribute("class", "received");
    greendiv.setAttribute("class", "grey");
    dateLabel.setAttribute("class", "dateLabel");
    greendiv.innerText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ";
    myDiv.appendChild(greendiv);
    myLI.appendChild(myDiv);
    greendiv.appendChild(dateLabel);
    document.getElementById("listUL").appendChild(myLI);
    var s = document.getElementById("chatting");
    s.scrollTop = s.scrollHeight;
    playSound();
}

// Hàm phát âm thanh khi gửi tin nhắn
function playSound() {
    var audio = new Audio('assets/sentmessage.mp3');
    audio.play();
} 