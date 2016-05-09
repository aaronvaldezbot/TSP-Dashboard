<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Master Page/Site1.Master" AutoEventWireup="true" CodeBehind="WBS.aspx.cs" Inherits="TSP_Dashboard.Views.Dashboard.WBS" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.0.min.js"></script>
  <script src="../../Scripts/WBS.js" type="text/javascript"></script>

	<!-- BEGIN CONTENT -->
	<div class="page-content-wrapper">
		<div class="page-content">
			<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
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
							<button type="button" class="btn blue">Save changes</button>
							<button type="button" class="btn default" data-dismiss="modal">Close</button>
						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal-dialog -->
			</div>
			<!-- /.modal -->
			<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- BEGIN PAGE HEADER-->
			<!-- BEGIN PAGE HEAD -->
			<div class="page-head">
				<!-- BEGIN PAGE TITLE -->
			<%--	<div class="page-title">
					<h1>WBS <small>Iteración 1</small></h1>
				</div>--%>
				<!-- END PAGE TITLE -->
				<!-- BEGIN PAGE TOOLBAR -->
				<div class="page-toolbar">
			
				</div>
				<!-- END PAGE TOOLBAR -->
			</div>
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
				<div class="col-md-12">					
					<!-- Begin: life time stats -->
					<div class="portlet light">
						<div class="portlet-title">
							<div class="caption">
								<i class="fa fa-gift font-green-sharp"></i>
								<span class="caption-subject font-green-sharp bold uppercase">WBS</span>
								<span class="caption-helper"></span>
							</div>
							<div class="actions">
								<a href="javascript:;" class="btn btn-sm yellow table-group-action-submit">
								<i class="fa fa-plus"></i>
								<span class="hidden-480">
								Guardar </span>
								</a>						
							</div>
						</div>
						<div class="portlet-body">
		  <ul class="rowProceso" id="rowProceso">
                                        </ul>
                  
						</div>
                        		
					</div>
					<!-- End: life time stats -->
				</div>
			</div>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
	<!-- END CONTENT -->
        
</asp:Content>
