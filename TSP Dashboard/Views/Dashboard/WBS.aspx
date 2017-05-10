<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Master Page/Site1.Master" AutoEventWireup="true" CodeBehind="WBS.aspx.cs" Inherits="TSP_Dashboard.Views.Dashboard.WBS" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
	<script src="../../Scripts/jquery-3.1.0.js"></script>
	<script src="../../Scripts/WBS.js" type="text/javascript"></script>


	<!-- BEGIN CONTENT -->
	<div class="page-content-wrapper">
		<div class="page-content">
			<%--style="margin-left: 200px;"--%>
			<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<%--puede regresar es temporal
                <div class="modal fade" id="portlet-config" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Modal title</h4>
						</div>
						<div class="modal-body">
							 Widget settings form goes here
						</div>
						<div class="modal-footer">
							<button type="button" class="btn blue" >Save changes</button>
							<button type="button" class="btn default" data-dismiss="modal">Close</button>
						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal-dialog -->
			</div>--%>
			<!-- /.modal -->
			<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- BEGIN PAGE HEADER-->
			<!-- BEGIN PAGE HEAD -->
			<%--<div class="page-head">
                                                <!-- BEGIN PAGE TITLE -->
                	                                <div class="page-title">
					                                <h1>WBS <small>Iteración 1</small></h1>
				                                </div>
                                                <!-- END PAGE TITLE -->
                                                <!-- BEGIN PAGE TOOLBAR -->
                                                <div class="page-toolbar">
                                                </div>
                                                <!-- END PAGE TOOLBAR -->
                                            </div>--%>
			<!-- END PAGE HEAD -->
			<!-- BEGIN PAGE BREADCRUMB -->
			<%--			<ul class="page-breadcrumb breadcrumb">
				<li>
					<a href="index.html">INICIO</a>
					<i class="fa fa-circle"></i>
				</li>
				<li>
					<a href="#">TSP</a>
					<i class="fa fa-circle"></i>
				</li>
				<li>
					<a href="#">WBS</a>
				</li>
			</ul>--%>
			<!-- END PAGE BREADCRUMB -->
			<!-- END PAGE HEADER-->
			<!-- BEGIN PAGE CONTENT-->
			<div class="row">
				<div class="col-md">
					<div>
						<!-- Begin: life time stats -->
						<div class="portlet light">
							<%--<div class="portlet-title">
                            <div class="caption" id="Modulos">
								<i class="fa fa-gift font-green-sharp"></i>
								<span class="caption-subject font-green-sharp bold uppercase">WBS</span>
								<span class="caption-helper"></span>
							</div>
                            <div class="tools">
								<a href="javascript:;" class="collapse"></a>
                                    </div>
                            </div>--%>

							<div class="portlet-body ">
								<%--util-btn-margin-bottom-5--%>
								<div class="actions" hidden>

									<div class="modal fade bs-modal-sm" id="modalSmElegirEquipo" data-backdrop="static"  data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" >
										<%--<div class="modal-dialog modal-sm">--%>
										<div id="modalProyecto" hidden>
											<select class="table-group-action-input form-control input-inline input-large select2-container" id="modals2Proyecto" onchange="">
												<option></option>
											</select>
											<button type="button" class="btn btn-success" onclick="SeleccionarProyecto();" id="btnSeleccionarProyecto">Seleccionar</button>
										</div>

										<div id="modalColeccion">
											<select class="table-group-action-input form-control input-inline input-large select2-container" id="modals2Coleccion" onchange="">
												<option></option>
											</select>
											<button type="button" class="btn btn-success" onclick="SeleccionarColeccion();" id="btnSeleccionarColeccion">Seleccionar</button>
										</div>

										<div id="modalIteraciones" hidden>
											<select class="table-group-action-input form-control input-inline input-large select2-container" id="modals2Equipo" onchange="">
												<option></option>
											</select>
											<button type="button" class="btn btn-success" onclick="GuardarEquipos();" id="btnSeleccionarEquipo">Seleccionar</button>
										</div>

									</div>

									<div class="" id="modalCargaEnvioTFS" data-backdrop="static"  data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">

										</div>

									<label id="nombreUsuario" hidden>
										<asp:LoginName runat="server" />
									</label>
									<%--<span class="caption-subject font-green-sharp bold uppercase"># de Copias</span>--%>
									<%--<input type="number" name="nocopia" id="nocopias" value="1" step="1" min="1" class="form-control form-filter input-sm" style="display: inline; width: 10%;" autofocus />--%>
									<!--<button type="button" class="btn btn-sm blue table-group-action-submit" onclick="copiarTodos()" id="copiartodos">Todos</button>-->
									<%--<button type="button" class="btn btn-sm blue" data-toggle="modal" data-target="#ModalConfiguracionGlobal"><span class="glyphicon glyphicon-cog"></span>Configuracion Global</button>--%>

									<div id="ModalConfiguracionGlobal" data-backdrop="static" data-keyboard="false" class="modal fade">
										<%--<div class="modal-dialog">--%>

										<!-- Modal content para conteo de horas-->
										<div class="modal-content">
											<div class="modal-header">
												<%--<button type="button" class="close" data-dismiss="modal">&times;</button>--%>
												<h4 class="modal-title">Configuracion de horas</h4>
											</div>
											<%--<div class="modal-body">
                                                <label>Horas: </label>
                                                <input class="form-control form-filter input-sm" id="txtModalHoras" type="number" min="0" value="0" style="display: inline; width: 70%;" autofocus />
                                            </div>--%>
											<form action="#" class="form-horizontal form-bordered">
												<div class="form-body">
													<%--<div class="form-group">
														<label class="control-label col-md-2">Horas:</label>
														<div class="col-md-2">
															<div class="input-group input-medium">
																<input type="number" class="form-control form-control-inline input-medium" id="txtModalHoras" min="0" value="0" step="1">
															</div>
														</div>
													</div>--%>
													<div class="form-group">
														<label class="control-label col-md-3">Rate</label>
														<div class="col-md-3">
															<div class="input-group input-medium">
																<table id="tableModalRate" class="table table-hover">
																	<%--<tr>
                                                                                <td>Analisis</td>
                                                                                <td>
                                                                                    <input type="number" id="RateGlobalAnalisis" value="0" min="0" step="1" class="form-control form-control-inline input-small"/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Diseño</td>
                                                                                <td>
                                                                                    <input type="number" id="RateGlobalDiseño" value="0" min="0" step="1" class="form-control form-control-inline input-small"/>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Desarrollo</td>
                                                                                <td>
                                                                                    <input type="number" id="RateGlobalDesarrollo" value="0" min="0" step="1" class="form-control form-control-inline input-small"/>
                                                                                </td>
                                                                            </tr>--%>
																</table>
															</div>
														</div>
													</div>
												</div>
											</form>
											<div class="modal-footer">
												<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
												<button type="button" class="btn btn-success" onclick="ConfiguracionGlobal()">Confirmar</button>
											</div>
										</div>

										<%--</div>--%>
									</div>

									<%--<button type="button" class="btn btn-sm blue" data-toggle="modal" data-target="#ModalConfigurarEquipo" onclick="">Configurar Equipo</button>--%>
									<div id="ModalConfigurarEquipo" class="modal fade modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog">
										<%--<div class="modal-dialog modal-lg">--%>

										<div class="modal-content">
											<div class="modal-header">
												<%--<button type="button" class="close" data-dismiss="modal">&times;</button>--%>
												<h4 class="modal-title">Configurar Equipo</h4>
											</div>
											<div class="modal-body">
												<form action="#" class="form-horizontal form-bordered">
													<div class="form-body">
														<div class="form-group">
															<label class="control-label col-md-3">Equipo: </label>
															<div class="col-md-3">
																<div class="input-group input-medium" id="modalEquipo">
																	<%--<select class="table-group-action-input form-control input-inline input-large select2-container" id="modals2Equipo2" onchange="">
                                                                        <option></option>
                                                                        </select>--%>
																	<label class="control-label" id="NombreEquipo"></label>
																	<%--<input type="button" id="modalbtnNuevoEquipo" value="+" class="btn blue" data-toggle="modal" data-target="#ModalNuevoEquipo"/>--%>
																</div>
															</div>

														</div>

														<div class="form-group">
															<label class="control-label col-md-3">Dias Inhabiles</label>
															<div class="col-md-3">
																<%--<div class="input-group input-medium date date-picker" data-provide="datepicker" data-date-format="yyyy-mm-dd" data-date-start-date="+0d">
                                                                    <input type = "text" class="form-control" id="FechaInhabilEquipo" readonly>
                                                                    <span class="input-group-btn">
                                                                    <button class="btn default" type="button"><i class="fa fa-calendar"></i></button>
                                                                    </span>
                                                                </div>--%>
																<div class="input-group date" id="DPDiasInhabiles">
																	<input type="text" class="form-control form-control-inline input-medium"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
																</div>
																<div class="input-group input-medium" id="modalDivHoy" style="display: none">
																	<input type="text" class="form-control" placeholder="Nombre de usuario" id="modalBuscarUsuario" oninput="BuscarUsuario(this);" />
																	<select class="select2-container" id="modals2Usuarios"></select>
																	<span class="input-group-btn">
																		<button class="btn blue" type="button" id="modalAgregarHoy" onclick="AgregarIntegranteHoy();">+</button>
																	</span>
																</div>
															</div>
														</div>

														<%--<div class="form-group">
															<label class="control-label col-md-3">Integrantes</label>
															<div class="col-md-3">
																<--<span><button type="button" class="btn red" data-toggle="modal" data-target="#ModalNuevoIntegrante">+</button></span>-->
																<div class="input-group input-medium">
																	<ul class="list-group" id="listaIntegrantes">
																		<--<li class="list-group-item" id="x"><span></span> Integrante 1<button type="button" class="btn blue">-</button></li>-->
																	</ul>
																</div>
															</div>
														</div>--%>

														<div class="form-group">
															<label class="control-label col-md-7">Integrantes</label>
															<div class="col-md-12">
																<table id="tableIntegrantes" class="table table-hover">
																	<thead>
																		<tr role="row" class="heading">
																			<th width="60%">Nombre Usuario</th>
																			<th width="40%">Capacidad</th>
																		</tr>
																	</thead>
																	<tbody>
																	</tbody>
																</table>
															</div>
														</div>

													</div>
												</form>
											</div>
											<div class="modal-footer">
												<%--<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>--%>
												<button type="button" class="btn btn-success" onclick="ConfigurarEquipo();">Confirmar</button>
											</div>
										</div>
										<%--</div>--%>
									</div>
									<%--<div id="ModalNuevoEquipo" class="modal fade" role="dialog">

                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                <h4 class="modal-title">Crear Nuevo Equipo</h4>
                                            </div>
                                            <div class="modal-body">
                                                <form action="#" class="form-horizontal form-bordered">
                                                    <div class="form-body">
                                                        <div class="form-group">
										                    <label class="control-label col-md-3">Nombre de Equipo</label>
										                        <div class="col-md-3">
											                        <div class="input-group input-medium">
												                        <input type="text" class="form-control" id="txtModalNombreEquipo">
											                        </div>
										                        </div>
									                    </div>

                                                        <div class="form-group">
										                    <label class="control-label col-md-3">Fecha de inicio</label>
										                    <div class="col-md-3">
											                    <div class="input-group input-medium date date-picker" data-provide="datepicker" data-date-format="yyyy-mm-dd">
												                    <input type="text" class="form-control" id="modalFechaInicio" readonly>
												                    <span class="input-group-btn">
												                    <button class="btn default" type="button"><i class="fa fa-calendar"></i></button>
												                    </span>
											                    </div>
										                    </div>
									                    </div>

                                                        <div class="form-group">
										                    <label class="control-label col-md-3">Fecha Final</label>
										                    <div class="col-md-3">
											                    <div class="input-group input-medium date date-picker" data-provide="datepicker" data-date-format="yyyy-mm-dd">
												                    <input type="text" class="form-control" id="modalFechaFinal" readonly>
												                    <span class="input-group-btn">
												                    <button class="btn default" type="button"><i class="fa fa-calendar"></i></button>
												                    </span>
											                    </div>
										                    </div>
									                    </div>

                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                                                <button type="button" class="btn btn-success" data-dismiss="modal" onclick="NuevoEquipo();">Confirmar</button>
                                            </div>
                                        </div>

                                </div>--%>
									<div id="ModalNuevoIntegrante" class="modal fade" role="dialog">
										<%--<div class="modal-dialog">--%>

										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal">&times;</button>
												<h4 class="modal-title">Nuevo Integrante</h4>
											</div>
											<div class="modal-body">
												<form action="#" class="form-horizontal form-bordered">
													<div class="form-body">
														<div class="form-group">
															<label class="control-label col-md-3">Integrante </label>
															<div class="col-md-3">
																<div class="input-group input-medium" id="modalIntegrantes">
																	<select class="table-group-action-input form-control input-inline input-large select2-container" id="modals2Integrantes" onchange="">
																		<option></option>
																	</select>
																</div>
															</div>
														</div>

														<div class="form-group">
															<label class="control-label col-md-3">Fecha de Ingreso</label>
															<div class="col-md-3">
																<div class="input-group input-medium date date-picker" data-provide="datepicker" data-date-format="yyyy-mm-dd">
																	<input type="text" class="form-control" id="modalFechaIngreso" readonly>
																	<span class="input-group-btn">
																		<button class="btn default" type="button"><i class="fa fa-calendar"></i></button>
																	</span>
																</div>
															</div>
														</div>
													</div>
												</form>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
												<button type="button" class="btn btn-success" onclick="AgregarIntegrante();">Confirmar</button>
											</div>
										</div>
										<%--</div>--%>
									</div>

									<%--<button type="button" class="btn btn-sm blue" data-toggle="modal" data-target="#ModalOrdenarProcesos" onclick="OrdenarProcesos();">Ordenar</button>--%>
									<%--<button type="button" id="btnOrdenar" class="btn btn-sm blue" data-toggle="modal" data-target="#ModalOrdenarProcesos" onclick="" disabled>Ordenar</button>--%>
									<div id="ModalOrdenarProcesos" class="modal fade" role="dialog">
										<%--<div class="modal-dialog">--%>

										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal">&times;</button>
												<h4 class="modal-title">Ordenar Procesos</h4>
											</div>
											<div class="modal-body">
												<form action="#" class="form-horizontal form-bordered">
													<div class="form-body">
														<div class="form-group">
															<label class="control-label col-md-3">Orden</label>
															<div class="col-md-9">
																<select multiple="multiple" id="modalSelectOrdenamiento">
																</select>
																<button type="button" class="btn btn-sm blue" id="arriba" onclick="BotonDeOrdenar(this)">^</button>
																<button type="button" class="btn btn-sm blue" id="abajo" onclick="BotonDeOrdenar(this)">v</button>
															</div>
														</div>

														<%--<div class="form-group">
										                    <label class="control-label col-md-3">Integrante </label>
										                        <div class="col-md-3">
											                        <div class="input-group input-medium" id="modalSelectOrdenamiento">
											                        </div>
										                        </div>
									                    </div>--%>
													</div>
												</form>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
												<button type="button" class="btn btn-success" data-dismiss="modal" onclick="OrdenarGrid();">Confirmar</button>
											</div>
										</div>
										<%--</div>--%>
									</div>

									<%--<button type="button" id="btnNomenclatura" class="btn btn-sm blue" data-toggle="modal" data-target="#ModalNomenclatura" onclick="">Establecer Nomenclatura</button>--%>
									<div id="ModalNomenclatura" class="modal fade modal-lg" role="dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal">&times;</button>
												<h4 class="modal-title">Nomenclatura</h4>
											</div>
											<div class="modal-body">
												<form action="#" class="form-horizontal form-bordered">
													<div class="form-body">
														<div class="form-group">
															<label class="control-label col-md-3">Nomenclatura para Procesos Primarios</label>
															<div class="col-md-3">
																<div class="input-group input-medium" id="">
																	<input type="text" id="iIdNomenclaturaPrimary" class="form-control form-control-inline input-medium" />
																</div>
															</div>

														</div>

														<div class="form-group">
															<label class="control-label col-md-3">Nomenclatura para Tareas</label>
															<div class="col-md-3">
																<div class="input-group input-medium" id="">
																	<input type="text" id="iIdNomenclaturaHijos" class="form-control form-control-inline input-medium" />
																</div>
															</div>
														</div>

														<div class="form-group">
															<div class="col-md-3">
																<div class="input-group input-medium">
																</div>
															</div>
														</div>

													</div>
												</form>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
												<button type="button" class="btn btn-success" onclick="AplicarNomenclatura();">Confirmar</button>
											</div>
										</div>
									</div>


									<div id="ModalPreview" class="modal container fade" role="dialog">
										<div class="modal-content">
											<div class="modal-header">
												<button type="button" class="close" data-dismiss="modal">&times;</button>
												<h4 class="modal-title">Preview</h4>
											</div>
											<div class="modal-body">
												<form action="#" class="form-horizontal form-bordered">
													<div class="form-body">
														<%--<div class="form-group">
                                                            <label class="control-label col-md-3">Preview</label>
										                        <div class="col-md-3">
											                        <div class="input-group input-medium" id="">
                                                                        <select class="form-control form-filter input-sm" id="modalPreviewRQM" onchange="Previsualizacion();">
                                                                        </select>
                                                                        <select class="form-control form-filter input-sm" id="modalPreviewPlan" onchange="Previsualizacion();">
                                                                        </select>
											                        </div>
										                        </div>
                                                            
									                    </div>

                                                        <div class="form-group">
										                    <div class="col-md-3">
                                                                <div class="input-group input-medium" id="">
                                                                    <table id="tablePreview" class="table table-striped table-bordered table-hover" style="width:400px">
                                                                        <thead>
                                                                            <tr>
                                                                                <th width="50%">
                                                                                    Proceso
                                                                                </th>
                                                                                <th width="50%">
                                                                                    Assigned To
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                        </tbody>
                                                                    </table>
                                                                </div>
										                    </div>
									                    </div>--%>

														<div class="form-group">
															<div class="col-md" id="divTree">
																<%--<div class="input-group input-medium" id="divTree">--%>
																	<%--<div id="PreviewTree">
																		<ul>
																		</ul>
																	</div>--%>
																<%--</div>--%>
															</div>
														</div>

													</div>
												</form>
											</div>
											<div class="modal-footer">
												<%--<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>--%>
												<button type="button" class="btn btn-success" onclick="">Enviar</button>
											</div>
										</div>
										<%--</div>--%>
									</div>


									<%--<button onclick="calcularValorGanado();" class="btn btn-sm yellow table-group-action-submit">
										<i class="fa fa-plus"></i>
										<span class="hidden-480">Calcular Valor Ganado </span>
									</button>--%>
									<%--<button onclick="GuardarWBS()" class="btn btn-sm yellow table-group-action-submit" id="iIdGuardar">
										<i class=""></i>
										<span class="hidden-480">Guardar </span>
									</button>--%>
									<%--<button onclick="previewCompleto();" class="btn btn-sm yellow table-group-action-submit" id="btnPrevisualizar" data-toggle="modal" data-target="#ModalPreview" disabled>
										<i class=""></i>
										<span class="hidden-480">Previsualizacion </span>
									</button>--%>
									<%--<button onclick="" class="btn btn-sm yellow table-group-action-submit" id="Enviar">
										<i class=""></i>
										<span class="hidden-480">Enviar </span>
									</button>--%>
									<%--<button class="btn btn-sm yellow" onclick="GuardarWBS2();">Prueba</button>--%>
								</div>

							</div>
							<%--</div>--%>



							<div style="padding-bottom: 5px;">
								<%--<span class="caption-subject font-green-sharp bold uppercase">Requerimiento</span>--%>
								<select class="table-group-action-input form-control input-inline input-small input-sm select2-container" id="iIdPlan" onchange="obtenerRequerimientos();ObtenerRequerimiento();ObtenerDatosByPlan();" disabled style="width: 19%;">
									<option></option>
								</select>
								<%--<button type="button" id="agregarplan" onclick="AgregarPlan()" class="btn btn-sm blue" disabled><span class="glyphicon glyphicon-plus-sign"></span> Nuevo Plan</button>--%>

								<select class="table-group-action-input form-control input-inline input-small input-sm select2-container" id="iIdRequerimiento" onchange="ObtenerRequerimiento()" disabled style="width: 19%;">
									<option></option>
								</select>
								<%--<button type="button" id="agregarRqm" data-toggle="modal" data-target="#ModaRQM" style="margin-right: 5px;" class="btn btn-sm blue" disabled><span class="glyphicon glyphicon-plus-sign"></span> Nuevo RQM</button>--%>

								<select class="table-group-action-input form-control input-inline input-small input-sm select2-container" id="iIdEtapas" onchange="ObtenerRequerimiento()" disabled style="width: 19%;">
									<option></option>
								</select>
								<%--<button type="button" id="agregarproceso" onclick="AgregarProceso()" style="margin-right: 5px;" class="btn btn-sm blue" disabled><span class="glyphicon glyphicon-plus-sign"></span> Nuevo Proceso</button>--%>

								<div id="ModaRQM" class="modal fade" role="dialog">
									<%--<div class="modal-dialog">--%>

									<!-- Modal content para conteo de horas-->
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal">&times;</button>
											<h4 class="modal-title">Requerimientos</h4>
										</div>
										<div class="modal-body">
											<span>Requerimiento:
                                            <input class="form-control form-filter input-sm" id="txtModalRQM" type="number" style="display: inline; width: 70%;" onkeyup="GetNombreRQMByIdEnter(event);" />
												<button type="button" id="btnModalAgregarRQM" onclick="GetNombreRQMById();" class="btn btn-sm blue">Agregar</button></span>
											<table class="table table-striped table-bordered table-hover">
												<thead>
													<tr role="row" class="heading">
														<td></td>
														<td>ID TFS</td>
														<td>Nombre</td>
													</tr>
												</thead>
												<tbody id="tbodyModalRQM">
												</tbody>
											</table>


										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
											<button type="button" class="btn btn-success" onclick="AgregarRQMGrid()">Confirmar</button>
										</div>
									</div>

									<%--</div>--%>
								</div>


								<div id="modalProceso" class="modal fade" role="dialog">
									<%--<div class="modal-dialog">--%>

									<!-- Modal content para conteo de horas-->
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal">&times;</button>
											<h4 class="modal-title">Proceso</h4>
										</div>
										<div class="modal-body">
											<span>Proceso:</span>
											<select id="modalProcesos" class="form-control form-filter input-sm"></select>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
											<button type="button" class="btn btn-success" data-dismiss="modal" onclick="insertarProceso()">Confirmar</button>
										</div>
									</div>

									<%--</div>--%>
								</div>

								<div id="ModalHibrido" data-backdrop="static" data-keyboard="false" class="modal fade">
									<div class="modal-content">
										<div class="modal-header">
											<%--<button type="button" class="close" data-dismiss="modal">&times;</button>--%>
											<h4 class="modal-title">Configurar Proceso Híbrido</h4>
										</div>
										<div class="modal-body">
											<form action="#" class="form-horizontal form-bordered">
												<div class="form-body">
													<div class="form-group">
														<label class="control-label col-md-3">Configuracion Híbrida</label>
														<div class="col-md-3">
															<div class="input-group input-medium">
																<table class="table table-hover" id="tableHibridoConfig">
																	<tr>
																		<td>Analisis</td>
																		<td>
																			<input type="number" value="1" step="1" min="0" id="HibridoAnalisis" class="form-control form-filter input-sm" />
																		</td>
																	</tr>
																	<tr>
																		<td>Diseño</td>
																		<td>
																			<input type="number" value="1" step="1" min="0" id="HibridoDiseño" class="form-control form-filter input-sm" />
																		</td>
																	</tr>
																	<tr>
																		<td>Desarrollo</td>
																		<td>
																			<input type="number" value="1" step="1" min="0" id="HibridoDesarrollo" class="form-control form-filter input-sm" />
																		</td>
																	</tr>
																</table>
															</div>
														</div>
													</div>
												</div>
											</form>
										</div>
										<div class="modal-footer">
											<%--<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>--%>
											<button type="button" class="btn btn-success" data-dismiss="modal" onclick="InsertarHibrido()">Confirmar</button>
										</div>
									</div>
								</div>

								<%--<span class="caption-subject font-green-sharp bold uppercase">Proceso</span>--%>


								<%--<span class="caption-subject font-green-sharp bold uppercase">Plan</span>--%>


								<select class="table-group-action-input form-control input-inline input-small input-sm select2-container" id="asignado" onchange="CambiarAsignado();" style="width: 19%;">
									<option></option>
								</select>
								<select class="table-group-action-input form-control input-inline input-small input-sm select2-container" id="revisor" onchange="CambiarRevisor();" style="width: 19%;">
									<option></option>
								</select>
							</div>
							<%--<div class="portlet-body">--%>
							<%--<div>--%>
							<div class="rowProceso" id="rowProceso">
								<%--   <ul class="rowProceso" id="rowProceso">--%>
								<div style="overflow-x: scroll; overflow-y: scroll">
									<div class="table-container" style="width: 2600px;">
										<table class="table table-striped table-bordered table-hover" id="datatable_ajax">
											<thead>
												<tr role="row" class="heading">
													<th width="5%">
														<%--<input type="checkbox" class="group-checkable">--%>
													</th>
													<%--<th width = "2%" hidden>
                                       Plan
                                   </th >--%>
													<th width="10%">Nombre del Proceso
													</th>
													<th width="5%">Tipo de Inspección
													</th>
													<th width="3%" hidden>Tipo de tarea
													</th>
													<th width="12%">Title
													</th>
													<th width="3%" hidden>Work Item Type</th>
													<th width="13% !important">Assigned To
													</th>
													<th width="5%">Remaining Work
													</th>
													<th width="5%">Original Estimate
													</th>
													<th width="5%">Tie
														mpo Total del proceso
													</th>
													<th width="5%">% de Tareas
													</th>
													<th width="5%">Tamaño
													</th>
													<th width="5%">Rate
													</th>
													<th width="5%">Valor ganado(%)
													</th>
													<th width="2%" hidden>Semana
													</th>
													<th width="2%" hidden>Valor ganado acumulado
													</th>
													<th width="2%" hidden>Valor ganado semanal
													</th>
													<th width="3%" hidden>Unidad Medida
													</th>

													<th width="6%">Fecha de inicio
													</th>
													<th width="6%">Fecha Final
													</th>
													<th width="3%" hidden>Horas Acumuladas
													</th>
													<th width="0%" hidden></th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
								<%--</ul>--%>
								<br />
								<br />
							</div>

						</div>
						<!-- End: life time stats -->
					</div>
				</div>
			</div>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
	<!-- END CONTENT -->

</asp:Content>
