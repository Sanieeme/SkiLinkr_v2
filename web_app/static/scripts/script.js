document.querySelector("input[type=range]").addEventListener("change", function() {
    document.querySelector("[name=hourly_rate]").value = this.value;
  });


