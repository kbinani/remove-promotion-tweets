chrome.storage.local.get(["user_id_list"], function(items) {
  const err = chrome.runtime.lastError;
  if (err) {
    console.log(err);
    return;
  }
  $("#text").html(Object.keys(items.user_id_list).join("\n"));
});

document.getElementById("clear_button").addEventListener("click", function() {
  chrome.storage.local.set({"user_id_list": {}}, function() {
    const err = chrome.runtime.lastError;
    if (err) {
      console.log(err);
      return;
    }
    $("#text").html("");
  });
});
