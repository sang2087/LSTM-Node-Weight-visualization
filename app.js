var app = angular.module('mainApp', [])

// 001001001001001 
// 2470/2470 [==============================] - 0s - loss: 0.0076 - val_loss: 0.0046
// -3.2996707
//  3.1764397
// 2.62984657
// -2.7215631
// -0.4507400
// 2.10085464
// -2.6017885
// -0.5729383
// 2.55205035
// -7.6918134
//  33.502117
// -0.4893759
//
//01010101010101
// 0.38139227
// 0.42107537
// 0.49933845
// 0.38671222
// 0.51917416
// 0.57219005
// 0.48140216
// 0.57287812
// 1.7637285
//-3.22881866
//-1.77120078
// 2.50000095

app.controller('MainCtrl', function($scope, $http) {
  var x_arr = null
  var x_arr_counter = 0
  $scope.selected_mode = null
  $scope.x_01 = function(){
    $scope.selected_mode = "01"
    var weight = [ 0.38139227,
                   0.42107537,
                   0.49933845,
                   0.38671222,
                   0.51917416,
                   0.57219005,
                   0.48140216,
                   0.57287812,
                   1.7637285 ,
                  -3.22881866,
                  -1.77120078,
                   2.50000095]



    init([0,1], weight)
  }

  $scope.x_001 = function(){
    $scope.selected_mode = "001"
    // var weight = [-2.73533988,
    //                2.86102939,
    //               2.4967432,
    //               -2.50913715,
    //                0.07219433,
    //               1.42136109,
    //               -2.45835519,
    //               -0.15634792,
    //               2.06382275,
    //               -10.6862974,
    //                22.1170826,
    //               -1.38653481]
    var weight = [ -3.2996707,
                    3.1764397,
                   2.62984657,
                   -2.7215631,
                   -0.4507400,
                   2.10085464,
                   -2.6017885,
                   -0.5729383,
                   2.55205035,
                   -7.6918134,
                    33.502117,
                   -0.4893759]

//
// [array([[]], dtype=float32),
//  array([[]], dtype=float32),
//  array([  dtype=float32),
//  array([[]], dtype=float32),
//  array([[]], dtype=float32),
//  array([ , dtype=float32),
//  array([[]], dtype=float32),
//  array([[]], dtype=float32),
//  array([ , dtype=float32),
//  array([[2]], dtype=float32),
//  array([[]], dtype=float32),
//  array([ ], dtype=float32)]

    init([0,0,1], weight)
  }
  $scope.x_0001 = function(){
    $scope.selected_mode = "0001"
var weight = [-0.11943994,
            1.46445251,
            2.55306888,
           -2.30508375,
            0.3817254 ,
            1.16732204,
           -2.29466629,
           -0.64777833,
            1.88051069,
           -3.00860691,
            44.4091606,
           -1.94958854]

    init([0,0,0,1], weight)
  }
  $scope.x_00001 = function(){
    $scope.selected_mode = "00001"
// [array([-1.28710949]], dtype=float32),
//  array([ 1.77364409]], dtype=float32),
//  array([ 2.14272189], dtype=float32),
//  array([-3.47407293]], dtype=float32),
//  array([ 1.99761927]], dtype=float32),
//  array([ 0.571051], dtype=float32),
//  array([-3.03730392]], dtype=float32),
//  array([-0.86529994]], dtype=float32),
//  array([ 2.68205094], dtype=float32),
//  array([-7.55275726]], dtype=float32),
//  array([ 9.85116768]], dtype=float32),
//  array([ 0.46403581], dtype=float32)]
var weight = [-1.287109,
            1.773644,
            2.142721,
           -3.474072,
            1.997619,
            0.571051,
           -3.037303,
           -0.865299,
            2.682050,
           -7.552757,
            9.851167,
            0.464035]

    init([0,0,0,0,1], weight)
  }




  function init(input, weight) {
    x_arr = input
    x_arr_counter = 0
    $scope.W_i = weight[0]
    $scope.U_i = weight[1]
    $scope.b_i = weight[2]
    $scope.W_c = weight[3]
    $scope.U_c = weight[4]
    $scope.b_c = weight[5]
    $scope.W_f = weight[6]
    $scope.U_f = weight[7]
    $scope.b_f = weight[8]
    $scope.W_o = weight[9]
    $scope.U_o = weight[10]
    $scope.b_o = weight[11]
    $scope.x = x_arr[x_arr_counter]
    $scope.h_tm1 = 0
    $scope.c_tm1 = 0
    $scope.wx_i = null;
    $scope.wx_f = null;
    $scope.wx_o = null;
    $scope.wx_c = null;
    $scope.uh_i = null;
    $scope.uh_f = null;
    $scope.uh_o = null;
    $scope.uh_c = null;
    $scope.i = null;
    $scope.f = null;
    $scope.o = null;
    $scope.c = null;
    $scope.cell = null;
    $scope.h = null;
    calc()
  }
  $scope.x_01()

  function calc() {
    var arr = ['i','f','o','c']
    for(var i=0;i<arr.length;i++){
      eval('$scope.wx_' + arr[i] + "= wx_(arr[i])")
      eval('$scope.uh_' + arr[i] + "= uh_(arr[i])")
    }

    $scope.i = calc_i()
    $scope.f = calc_f()
    $scope.o = calc_o()
    $scope.c = calc_c()
    $scope.cell = calc_cell()
    $scope.tanh_cell = calc_tanh_cell()
    $scope.h = calc_h()
    $scope.output = -2.13915324 * $scope.h -0.05402693

  }


  function wx_(gate){
    return round((eval('$scope.W_'+gate) * $scope.x))
  }
  function uh_(gate){
    return round((eval('$scope.U_'+gate) * $scope.h_tm1))
  }

  function calc_i(){
    return round(hard_sigmoid($scope.wx_i + $scope.uh_i + $scope.b_i))
  }
  function calc_f(){
    return round(hard_sigmoid($scope.wx_f + $scope.uh_f + $scope.b_f))
  }
  function calc_o(){
    return round(hard_sigmoid($scope.wx_o + $scope.uh_o + $scope.b_o))
  }

  function calc_c(){
    var t = Math.tanh($scope.wx_c + $scope.uh_c + $scope.b_c)
    if($scope.wx_c > 100){
      t = 1
    }
    if($scope.wx_c <-100){
      t = -1
    }
    return round(t)

  }

  function calc_cell(){
    return round($scope.f * $scope.c_tm1 + ($scope.i * $scope.c))
  }
  function calc_tanh_cell(){
    var t = Math.tanh($scope.cell)
    if($scope.cell > 100){
      t = 1
    }
    if($scope.cell < -100){
      t = -1
    }
    return round(t)
  }

  function calc_h(){
    return round($scope.o * $scope.tanh_cell)
  }
  $scope.next = function(){
    $scope.h_tm1 = $scope.h
    $scope.c_tm1 = $scope.cell
    x_arr_counter++
    if(x_arr_counter >= x_arr.length){
      x_arr_counter = 0
    }
    $scope.x = x_arr[x_arr_counter]
    calc()
  }
})

function hard_sigmoid(value) {
  var v = 0.2 * value + 0.5
  if(v > 1)
    v = 1
  if(v < 0)
    v = 0

  return v
}
function round(value) {
  return parseInt(value*10000) / 10000
}
