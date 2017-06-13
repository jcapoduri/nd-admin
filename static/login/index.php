<!DOCTYPE html>
<html>
<head>
  <title>Nd::Login</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
</head>
<body>
  <nav class="navbar navbar-default">
    <div class="content-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Nd::Practico 1</a>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-6">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email o usuario</label>
            <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="passwordInput" placeholder="Password">
          </div>
        </form>
        <button type="submit" class="btn btn-primary">Entrar</button>
      </div>
    </div>
  </div>
  <script type="text/javascript">
    $(document).ready(function() {
      $('button').click(function() {
        $(this).attr('disabled');
        form = $('form');
        $.ajax({
          type: "POST",
          url: '../api/v1/login',
          contentType: "application/json",
          dataType: 'json',
          data: JSON.stringify({
            username: form.find('input#emailInput').val(),
            password: form.find('input#passwordInput').val()
          })
        }).then(function(response) {
          if (response) {
            window.location = '..';
          }
        })
      });
    });

  </script>
</body>
</html>
