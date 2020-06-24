<?php
# POST KEYS
const OPERATION_KEY = 'OPERATION_NAME';

if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {

    require_once '../../DB/dsv_me_reports_pdo.php';
    //Crear el PDO para llamar a los procedimientos

    $response = new Response();

    if ( !isset( $_POST[OPERATION_KEY] ) ) {

        $response->setError( 'The '.OPERATION_KEY.' parameter is requiered' );
    } else {

        $dsv_profile = new  DSV_ME();

        switch ( $_POST[OPERATION_KEY] )
 {
            
            case 'GET_INVOICING_SPEED_DETAILS_SUPERVISOR_REPORT':
                $response = $dsv_profile->GetInvoicingSpeedDetailsSupervisorReport($_POST["id_staff"]);
            break;

            default:
            $response->setError( 'Undefined operation name' );
            break;
        }
        //ends switch
    }
    echo json_encode( $response );
}
?>