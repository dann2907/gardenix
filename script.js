document.addEventListener("DOMContentLoaded", function() {
    // Fetch sensor data from ESP8266
    function fetchSensorData() {
        fetch('/status')
            .then(response => response.json())
            .then(data => {
                document.getElementById("soil-moisture").innerText = data.soilMoisture;
                document.getElementById("temperature").innerText = data.temperature + " °C";
                document.getElementById("humidity").innerText = data.humidity + " %";
                document.getElementById("co2-level").innerText = data.co2Level + " ppm";
                document.getElementById("pump-status").innerText = data.pumpStatus === "true" ? "ON" : "OFF";
                document.getElementById("control-mode").innerText = data.controlMode;
            })
            .catch(error => console.error('Error fetching sensor data:', error));
    }

    // Fetch network info (optional)
    function fetchNetworkInfo() {
        fetch('/info')
            .then(response => response.text())
            .then(data => {
                console.log(data);  // Display network info in console
            })
            .catch(error => console.error('Error fetching network info:', error));
    }

    // Toggle pump
    function togglePump() {
        fetch('/toggle_pompa')
            .then(response => response.text())
            .then(data => {
                alert(data);  // Show status of pump
                fetchSensorData();  // Refresh sensor data
            })
            .catch(error => console.error('Error toggling pump:', error));
    }

    // Toggle system
    function toggleSystem() {
        fetch('/toggle_system')
            .then(response => response.text())
            .then(data => {
                alert(data);  // Show status of system
                fetchSensorData();  // Refresh sensor data
            })
            .catch(error => console.error('Error toggling system:', error));
    }

    // Set fetch intervals for sensor data (every 5 seconds)
    setInterval(fetchSensorData, 5000);
    fetchSensorData();  // Initial fetch on page load
});
