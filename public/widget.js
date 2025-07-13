(function () {
    const iframe = document.createElement('iframe');
    iframe.src = "https://yourdomain.com/chat"; // Replace with your chatbot URL
    iframe.style.position = "fixed";
    iframe.style.bottom = "20px";
    iframe.style.right = "20px";
    iframe.style.width = "350px";
    iframe.style.height = "500px";
    iframe.style.border = "none";
    iframe.style.borderRadius = "12px";
    iframe.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    iframe.style.zIndex = "9999";
    iframe.title = "AI Chatbot";
    document.body.appendChild(iframe);
})();