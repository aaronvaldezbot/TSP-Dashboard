﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

// 
// This source code was auto-generated by Microsoft.VSDesigner, Version 4.0.30319.42000.
// 
#pragma warning disable 1591

namespace TSP_Dashboard.wsTFSExterno {
    using System;
    using System.Web.Services;
    using System.Diagnostics;
    using System.Web.Services.Protocols;
    using System.Xml.Serialization;
    using System.ComponentModel;
    
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Web.Services.WebServiceBindingAttribute(Name="wsTFSExternoSoap", Namespace="http://tempuri.org/")]
    public partial class wsTFSExterno : System.Web.Services.Protocols.SoapHttpClientProtocol {
        
        private System.Threading.SendOrPostCallback HelloWorldOperationCompleted;
        
        private System.Threading.SendOrPostCallback ObtenerTiposTareaOperationCompleted;
        
        private System.Threading.SendOrPostCallback ObtenerTituloElementoTFSOperationCompleted;
        
        private System.Threading.SendOrPostCallback ObtenerUsuariosOperationCompleted;
        
        private System.Threading.SendOrPostCallback ObtenerCapacidadSprintOperationCompleted;
        
        private System.Threading.SendOrPostCallback ObtenerIteracionesOperationCompleted;
        
        private System.Threading.SendOrPostCallback EnviarTFSOperationCompleted;
        
        private bool useDefaultCredentialsSetExplicitly;
        
        /// <remarks/>
        public wsTFSExterno() {
            this.Url = global::TSP_Dashboard.Properties.Settings.Default.TSP_Dashboard_wsTFSExterno_wsTFSExterno;
            if ((this.IsLocalFileSystemWebService(this.Url) == true)) {
                this.UseDefaultCredentials = true;
                this.useDefaultCredentialsSetExplicitly = false;
            }
            else {
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        public new string Url {
            get {
                return base.Url;
            }
            set {
                if ((((this.IsLocalFileSystemWebService(base.Url) == true) 
                            && (this.useDefaultCredentialsSetExplicitly == false)) 
                            && (this.IsLocalFileSystemWebService(value) == false))) {
                    base.UseDefaultCredentials = false;
                }
                base.Url = value;
            }
        }
        
        public new bool UseDefaultCredentials {
            get {
                return base.UseDefaultCredentials;
            }
            set {
                base.UseDefaultCredentials = value;
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        /// <remarks/>
        public event HelloWorldCompletedEventHandler HelloWorldCompleted;
        
        /// <remarks/>
        public event ObtenerTiposTareaCompletedEventHandler ObtenerTiposTareaCompleted;
        
        /// <remarks/>
        public event ObtenerTituloElementoTFSCompletedEventHandler ObtenerTituloElementoTFSCompleted;
        
        /// <remarks/>
        public event ObtenerUsuariosCompletedEventHandler ObtenerUsuariosCompleted;
        
        /// <remarks/>
        public event ObtenerCapacidadSprintCompletedEventHandler ObtenerCapacidadSprintCompleted;
        
        /// <remarks/>
        public event ObtenerIteracionesCompletedEventHandler ObtenerIteracionesCompleted;
        
        /// <remarks/>
        public event EnviarTFSCompletedEventHandler EnviarTFSCompleted;
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/HelloWorld", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string HelloWorld() {
            object[] results = this.Invoke("HelloWorld", new object[0]);
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void HelloWorldAsync() {
            this.HelloWorldAsync(null);
        }
        
        /// <remarks/>
        public void HelloWorldAsync(object userState) {
            if ((this.HelloWorldOperationCompleted == null)) {
                this.HelloWorldOperationCompleted = new System.Threading.SendOrPostCallback(this.OnHelloWorldOperationCompleted);
            }
            this.InvokeAsync("HelloWorld", new object[0], this.HelloWorldOperationCompleted, userState);
        }
        
        private void OnHelloWorldOperationCompleted(object arg) {
            if ((this.HelloWorldCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.HelloWorldCompleted(this, new HelloWorldCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/ObtenerTiposTarea", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string ObtenerTiposTarea(string sProyecto, string sColeccion) {
            object[] results = this.Invoke("ObtenerTiposTarea", new object[] {
                        sProyecto,
                        sColeccion});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void ObtenerTiposTareaAsync(string sProyecto, string sColeccion) {
            this.ObtenerTiposTareaAsync(sProyecto, sColeccion, null);
        }
        
        /// <remarks/>
        public void ObtenerTiposTareaAsync(string sProyecto, string sColeccion, object userState) {
            if ((this.ObtenerTiposTareaOperationCompleted == null)) {
                this.ObtenerTiposTareaOperationCompleted = new System.Threading.SendOrPostCallback(this.OnObtenerTiposTareaOperationCompleted);
            }
            this.InvokeAsync("ObtenerTiposTarea", new object[] {
                        sProyecto,
                        sColeccion}, this.ObtenerTiposTareaOperationCompleted, userState);
        }
        
        private void OnObtenerTiposTareaOperationCompleted(object arg) {
            if ((this.ObtenerTiposTareaCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.ObtenerTiposTareaCompleted(this, new ObtenerTiposTareaCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/ObtenerTituloElementoTFS", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string ObtenerTituloElementoTFS(string IdTFS, string sProyecto, string sColeccion) {
            object[] results = this.Invoke("ObtenerTituloElementoTFS", new object[] {
                        IdTFS,
                        sProyecto,
                        sColeccion});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void ObtenerTituloElementoTFSAsync(string IdTFS, string sProyecto, string sColeccion) {
            this.ObtenerTituloElementoTFSAsync(IdTFS, sProyecto, sColeccion, null);
        }
        
        /// <remarks/>
        public void ObtenerTituloElementoTFSAsync(string IdTFS, string sProyecto, string sColeccion, object userState) {
            if ((this.ObtenerTituloElementoTFSOperationCompleted == null)) {
                this.ObtenerTituloElementoTFSOperationCompleted = new System.Threading.SendOrPostCallback(this.OnObtenerTituloElementoTFSOperationCompleted);
            }
            this.InvokeAsync("ObtenerTituloElementoTFS", new object[] {
                        IdTFS,
                        sProyecto,
                        sColeccion}, this.ObtenerTituloElementoTFSOperationCompleted, userState);
        }
        
        private void OnObtenerTituloElementoTFSOperationCompleted(object arg) {
            if ((this.ObtenerTituloElementoTFSCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.ObtenerTituloElementoTFSCompleted(this, new ObtenerTituloElementoTFSCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/ObtenerUsuarios", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string ObtenerUsuarios(string sProyecto, string sColeccion) {
            object[] results = this.Invoke("ObtenerUsuarios", new object[] {
                        sProyecto,
                        sColeccion});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void ObtenerUsuariosAsync(string sProyecto, string sColeccion) {
            this.ObtenerUsuariosAsync(sProyecto, sColeccion, null);
        }
        
        /// <remarks/>
        public void ObtenerUsuariosAsync(string sProyecto, string sColeccion, object userState) {
            if ((this.ObtenerUsuariosOperationCompleted == null)) {
                this.ObtenerUsuariosOperationCompleted = new System.Threading.SendOrPostCallback(this.OnObtenerUsuariosOperationCompleted);
            }
            this.InvokeAsync("ObtenerUsuarios", new object[] {
                        sProyecto,
                        sColeccion}, this.ObtenerUsuariosOperationCompleted, userState);
        }
        
        private void OnObtenerUsuariosOperationCompleted(object arg) {
            if ((this.ObtenerUsuariosCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.ObtenerUsuariosCompleted(this, new ObtenerUsuariosCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/ObtenerCapacidadSprint", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string ObtenerCapacidadSprint(string sSprint, string sUserName, string sPassword, string sProyecto, string sColeccion) {
            object[] results = this.Invoke("ObtenerCapacidadSprint", new object[] {
                        sSprint,
                        sUserName,
                        sPassword,
                        sProyecto,
                        sColeccion});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void ObtenerCapacidadSprintAsync(string sSprint, string sUserName, string sPassword, string sProyecto, string sColeccion) {
            this.ObtenerCapacidadSprintAsync(sSprint, sUserName, sPassword, sProyecto, sColeccion, null);
        }
        
        /// <remarks/>
        public void ObtenerCapacidadSprintAsync(string sSprint, string sUserName, string sPassword, string sProyecto, string sColeccion, object userState) {
            if ((this.ObtenerCapacidadSprintOperationCompleted == null)) {
                this.ObtenerCapacidadSprintOperationCompleted = new System.Threading.SendOrPostCallback(this.OnObtenerCapacidadSprintOperationCompleted);
            }
            this.InvokeAsync("ObtenerCapacidadSprint", new object[] {
                        sSprint,
                        sUserName,
                        sPassword,
                        sProyecto,
                        sColeccion}, this.ObtenerCapacidadSprintOperationCompleted, userState);
        }
        
        private void OnObtenerCapacidadSprintOperationCompleted(object arg) {
            if ((this.ObtenerCapacidadSprintCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.ObtenerCapacidadSprintCompleted(this, new ObtenerCapacidadSprintCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/ObtenerIteraciones", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string ObtenerIteraciones(string sProyecto, string sColeccion) {
            object[] results = this.Invoke("ObtenerIteraciones", new object[] {
                        sProyecto,
                        sColeccion});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void ObtenerIteracionesAsync(string sProyecto, string sColeccion) {
            this.ObtenerIteracionesAsync(sProyecto, sColeccion, null);
        }
        
        /// <remarks/>
        public void ObtenerIteracionesAsync(string sProyecto, string sColeccion, object userState) {
            if ((this.ObtenerIteracionesOperationCompleted == null)) {
                this.ObtenerIteracionesOperationCompleted = new System.Threading.SendOrPostCallback(this.OnObtenerIteracionesOperationCompleted);
            }
            this.InvokeAsync("ObtenerIteraciones", new object[] {
                        sProyecto,
                        sColeccion}, this.ObtenerIteracionesOperationCompleted, userState);
        }
        
        private void OnObtenerIteracionesOperationCompleted(object arg) {
            if ((this.ObtenerIteracionesCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.ObtenerIteracionesCompleted(this, new ObtenerIteracionesCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://tempuri.org/EnviarTFS", RequestNamespace="http://tempuri.org/", ResponseNamespace="http://tempuri.org/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string EnviarTFS(string JsonWbs, string sColeccion, string sProyecto) {
            object[] results = this.Invoke("EnviarTFS", new object[] {
                        JsonWbs,
                        sColeccion,
                        sProyecto});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void EnviarTFSAsync(string JsonWbs, string sColeccion, string sProyecto) {
            this.EnviarTFSAsync(JsonWbs, sColeccion, sProyecto, null);
        }
        
        /// <remarks/>
        public void EnviarTFSAsync(string JsonWbs, string sColeccion, string sProyecto, object userState) {
            if ((this.EnviarTFSOperationCompleted == null)) {
                this.EnviarTFSOperationCompleted = new System.Threading.SendOrPostCallback(this.OnEnviarTFSOperationCompleted);
            }
            this.InvokeAsync("EnviarTFS", new object[] {
                        JsonWbs,
                        sColeccion,
                        sProyecto}, this.EnviarTFSOperationCompleted, userState);
        }
        
        private void OnEnviarTFSOperationCompleted(object arg) {
            if ((this.EnviarTFSCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.EnviarTFSCompleted(this, new EnviarTFSCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        public new void CancelAsync(object userState) {
            base.CancelAsync(userState);
        }
        
        private bool IsLocalFileSystemWebService(string url) {
            if (((url == null) 
                        || (url == string.Empty))) {
                return false;
            }
            System.Uri wsUri = new System.Uri(url);
            if (((wsUri.Port >= 1024) 
                        && (string.Compare(wsUri.Host, "localHost", System.StringComparison.OrdinalIgnoreCase) == 0))) {
                return true;
            }
            return false;
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void HelloWorldCompletedEventHandler(object sender, HelloWorldCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class HelloWorldCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal HelloWorldCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void ObtenerTiposTareaCompletedEventHandler(object sender, ObtenerTiposTareaCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class ObtenerTiposTareaCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal ObtenerTiposTareaCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void ObtenerTituloElementoTFSCompletedEventHandler(object sender, ObtenerTituloElementoTFSCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class ObtenerTituloElementoTFSCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal ObtenerTituloElementoTFSCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void ObtenerUsuariosCompletedEventHandler(object sender, ObtenerUsuariosCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class ObtenerUsuariosCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal ObtenerUsuariosCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void ObtenerCapacidadSprintCompletedEventHandler(object sender, ObtenerCapacidadSprintCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class ObtenerCapacidadSprintCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal ObtenerCapacidadSprintCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void ObtenerIteracionesCompletedEventHandler(object sender, ObtenerIteracionesCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class ObtenerIteracionesCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal ObtenerIteracionesCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    public delegate void EnviarTFSCompletedEventHandler(object sender, EnviarTFSCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.6.1038.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class EnviarTFSCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal EnviarTFSCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
}

#pragma warning restore 1591