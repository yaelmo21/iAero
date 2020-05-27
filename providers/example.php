<?php 
    include('nusoap/lib/nusoap.php');
    // error_reporting(E_ALL);
    // ini_set('display_errors', '1');
    // $data = '{"fecha":"20-05-2020","origin":"Ciudad de México, México","destino":"Monterrey, Nuevo León México"}';
    // $param = json_decode($data);
    // $parametros = array('origin' => $param->{'origin'},'destination' => $param->{'destino'}, 'date' => $param->{'fecha'});
    // var_dump($parametros);
    $soapClient = new nusoap_client('http://3.15.219.220:8080/aerolinea.wsdl','wsdl'); 

 


    function getVuelos($dataJson){
        global $soapClient;
        $data = json_decode($dataJson);
        echo getFechaSql($data->{'fecha'});
        $parametros = array('origin' => $data->{'origin'} ,'destination' => $data->{'destino'}, 'date' => '');
        
        var_dump($parametros);
        // $response = $soapClient->call("Vuelos", array($parametros));
        // if (!isset($response['alert'])){
        //     $dataResponse = array('message'=>'correct', 'data'=>$response['vuelo']);
        // }else{
        //     $dataResponse = array('message'=>'fail', 'data'=>$response['alert']);
        // }

		// echo json_encode($dataResponse);
    }

    function getFechaSql($fecha){
        $date = str_replace('/', '-', $fecha);
        $fecha = date('Y-m-d', strtotime($date));
        return $fecha;
    }

    $json = '{"fecha":"20/05/2020","origin":"Ciudad de Mexico, Mexico","destino":"Monterrey, Nuevo Leon Mexico"}';
    getVuelos($json);
?>