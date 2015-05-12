@app.module.filter 'time', ->
  (value) ->
    min = parseInt value / 60
    sec = parseInt value - (min * 60)
    "#{if min < 10 then '0' + min else min}:#{if sec < 10 then '0' + sec else sec}"