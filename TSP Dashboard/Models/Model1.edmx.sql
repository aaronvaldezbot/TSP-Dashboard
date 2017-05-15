
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 05/11/2017 17:45:57
-- Generated from EDMX file: C:\Users\raul.tuyin\Documents\Visual Studio 2015\Projects\TSP-Dashboard\TSP Dashboard\Models\Model1.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [TSP_DEV];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_tblCat_Title_iIdTitle]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCat_WBS] DROP CONSTRAINT [FK_tblCat_Title_iIdTitle];
GO
IF OBJECT_ID(N'[dbo].[FK_tblRel_Equipos_iIdEquipo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblRel_Equipos] DROP CONSTRAINT [FK_tblRel_Equipos_iIdEquipo];
GO
IF OBJECT_ID(N'[dbo].[FK_tblRel_ProcesoRevision_iIdEquipo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblRel_ProcesoRevision] DROP CONSTRAINT [FK_tblRel_ProcesoRevision_iIdEquipo];
GO
IF OBJECT_ID(N'[dbo].[FK_tblRel_Equipos_iIdUsuario]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblRel_Equipos] DROP CONSTRAINT [FK_tblRel_Equipos_iIdUsuario];
GO
IF OBJECT_ID(N'[dbo].[FK_tblRel_EquipoFecha_iIdEquipo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblRel_EquipoFecha] DROP CONSTRAINT [FK_tblRel_EquipoFecha_iIdEquipo];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_WBS_iIdPlan]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCat_WBS] DROP CONSTRAINT [FK_tblCat_WBS_iIdPlan];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_Modulo_iIdSistema]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCat_Modulo] DROP CONSTRAINT [FK_tblCat_Modulo_iIdSistema];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_DetalleProceso_iIdProceso]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCat_DetalleProceso] DROP CONSTRAINT [FK_tblCat_DetalleProceso_iIdProceso];
GO
IF OBJECT_ID(N'[dbo].[FK__tblRel_ProcesoRevision_iIdProceso]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblRel_ProcesoRevision] DROP CONSTRAINT [FK__tblRel_ProcesoRevision_iIdProceso];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_WBS_iIdProcesos]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCat_WBS] DROP CONSTRAINT [FK_tblCat_WBS_iIdProcesos];
GO
IF OBJECT_ID(N'[dbo].[FK_iIdProceso]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCat_VersionProceso] DROP CONSTRAINT [FK_iIdProceso];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_VersionProcesotblCat_DetalleProceso]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCat_DetalleProceso] DROP CONSTRAINT [FK_tblCat_VersionProcesotblCat_DetalleProceso];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_UsuariostblRel_UsuarioPerfil]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblRel_UsuarioPerfil] DROP CONSTRAINT [FK_tblCat_UsuariostblRel_UsuarioPerfil];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_PerfiltblRel_UsuarioPerfil]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblRel_UsuarioPerfil] DROP CONSTRAINT [FK_tblCat_PerfiltblRel_UsuarioPerfil];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_PerfiltblCat_ControlesUI]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCat_ControlesUI] DROP CONSTRAINT [FK_tblCat_PerfiltblCat_ControlesUI];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_EquipotblRel_EquipoPlan]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblRel_EquipoPlan] DROP CONSTRAINT [FK_tblCat_EquipotblRel_EquipoPlan];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_PlantblRel_EquipoPlan]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblRel_EquipoPlan] DROP CONSTRAINT [FK_tblCat_PlantblRel_EquipoPlan];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_UsuariostblCat_WBS]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCat_WBS] DROP CONSTRAINT [FK_tblCat_UsuariostblCat_WBS];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_TipoTareatblCat_DetalleProceso_iIdTipoTarea]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCat_DetalleProceso] DROP CONSTRAINT [FK_tblCat_TipoTareatblCat_DetalleProceso_iIdTipoTarea];
GO
IF OBJECT_ID(N'[dbo].[FK_tblCat_WBStblCat_TipoTarea_iIdTipoTarea]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[tblCat_WBS] DROP CONSTRAINT [FK_tblCat_WBStblCat_TipoTarea_iIdTipoTarea];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[tblCat_Modulo]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_Modulo];
GO
IF OBJECT_ID(N'[dbo].[tblCat_DetalleProceso]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_DetalleProceso];
GO
IF OBJECT_ID(N'[dbo].[tblCat_WBS]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_WBS];
GO
IF OBJECT_ID(N'[dbo].[tblCat_Equipo]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_Equipo];
GO
IF OBJECT_ID(N'[dbo].[tblCat_Usuarios]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_Usuarios];
GO
IF OBJECT_ID(N'[dbo].[tblRel_Equipos]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblRel_Equipos];
GO
IF OBJECT_ID(N'[dbo].[tblRel_ProcesoRevision]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblRel_ProcesoRevision];
GO
IF OBJECT_ID(N'[dbo].[tblRel_EquipoFecha]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblRel_EquipoFecha];
GO
IF OBJECT_ID(N'[dbo].[tblCat_Plan]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_Plan];
GO
IF OBJECT_ID(N'[dbo].[tblCat_TipoTarea]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_TipoTarea];
GO
IF OBJECT_ID(N'[dbo].[tblCat_Sistema]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_Sistema];
GO
IF OBJECT_ID(N'[dbo].[tblCat_Proceso]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_Proceso];
GO
IF OBJECT_ID(N'[dbo].[tblCat_VersionProceso]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_VersionProceso];
GO
IF OBJECT_ID(N'[dbo].[tblRel_EquipoPlan]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblRel_EquipoPlan];
GO
IF OBJECT_ID(N'[dbo].[tblCat_Perfil]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_Perfil];
GO
IF OBJECT_ID(N'[dbo].[tblRel_UsuarioPerfil]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblRel_UsuarioPerfil];
GO
IF OBJECT_ID(N'[dbo].[tblCat_ControlesUI]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_ControlesUI];
GO
IF OBJECT_ID(N'[dbo].[tblCat_TareasOpcionales]', 'U') IS NOT NULL
    DROP TABLE [dbo].[tblCat_TareasOpcionales];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'tblCat_Modulo'
CREATE TABLE [dbo].[tblCat_Modulo] (
    [iIdModulo] int IDENTITY(1,1) NOT NULL,
    [cNombreModulo] varchar(150)  NULL,
    [cDescripcion] varchar(max)  NOT NULL,
    [cRuta] varchar(70)  NULL,
    [iOrden] int  NOT NULL,
    [iImagen] int  NOT NULL,
    [dtAlta] datetime  NOT NULL,
    [dtModificacion] datetime  NULL,
    [lActivo] bit  NOT NULL,
    [iIdSistema] int  NOT NULL,
    [iIdClasePermiso] int  NOT NULL,
    [lGrid] int  NOT NULL,
    [lFrontEnd] bit  NOT NULL
);
GO

-- Creating table 'tblCat_DetalleProceso'
CREATE TABLE [dbo].[tblCat_DetalleProceso] (
    [iIdDetalleProceso] int IDENTITY(1,1) NOT NULL,
    [cNombreDetalleProceso] varchar(150)  NULL,
    [dtAlta] datetime  NOT NULL,
    [dtModificacion] datetime  NULL,
    [iIdProceso] int  NULL,
    [lActivo] bit  NOT NULL,
    [iRevision] int  NULL,
    [iIdVersionProceso] int  NOT NULL,
    [lRequerida] bit  NOT NULL,
    [dPorcentaje] decimal(18,0)  NOT NULL,
    [lTamaño] bit  NOT NULL,
    [iIdTipoTarea] int  NOT NULL
);
GO

-- Creating table 'tblCat_WBS'
CREATE TABLE [dbo].[tblCat_WBS] (
    [iIdWBS] int  NOT NULL,
    [iIdPlan] int  NOT NULL,
    [iRequerimiento] int  NOT NULL,
    [iIdProcesos] int  NOT NULL,
    [iIdDetalleProceso] int  NOT NULL,
    [cWork_Item_Type] decimal(18,2)  NOT NULL,
    [iTipoElemento] int  NOT NULL,
    [dRemaining_Work] decimal(18,3)  NOT NULL,
    [dOriginal_Estimate] decimal(18,3)  NOT NULL,
    [dTiempo_Total_del_proceso] decimal(18,3)  NOT NULL,
    [dPorcentaje_de_tareas] decimal(18,3)  NOT NULL,
    [dtamanios] decimal(18,3)  NOT NULL,
    [dRate] decimal(18,3)  NOT NULL,
    [dValor_ganado] decimal(18,3)  NOT NULL,
    [isemana] int  NOT NULL,
    [dValor_ganado_acumulado] decimal(18,3)  NOT NULL,
    [dValor_ganado_semanal] decimal(18,3)  NOT NULL,
    [iIdTipoTarea] int  NOT NULL,
    [cUnidad_de_medida] varchar(40)  NOT NULL,
    [dtFecha_de_inicio] datetime  NOT NULL,
    [dtFechaFinal] datetime  NOT NULL,
    [dtHoras_Acumuladas] datetime  NOT NULL,
    [dtAlta] datetime  NOT NULL,
    [dtModificacion] datetime  NULL,
    [lActivo] bit  NOT NULL,
    [iIdTFS] int  NULL,
    [iIdUsuario] uniqueidentifier  NOT NULL,
    [iGrupo] int  NOT NULL,
    [lAplicaMultiProceso] bit  NOT NULL,
    [cTituloProceso] nvarchar(max)  NOT NULL,
    [iRevision] int  NULL,
    [dtTimeStamp] datetime  NULL,
    [iOrdenDetalleProceso] int  NOT NULL,
    [iOrdenProceso] int  NOT NULL,
    [iOrdenRequerimiento] int  NULL,
    [iOrden] int  NULL
);
GO

-- Creating table 'tblCat_Equipo'
CREATE TABLE [dbo].[tblCat_Equipo] (
    [iIdEquipo] uniqueidentifier  NOT NULL,
    [cNombreEquipo] varchar(max)  NOT NULL
);
GO

-- Creating table 'tblCat_Usuarios'
CREATE TABLE [dbo].[tblCat_Usuarios] (
    [iIdUsuario] uniqueidentifier  NOT NULL,
    [cNombreUsuario] varchar(max)  NOT NULL,
    [cClaveUsuario] varchar(50)  NOT NULL
);
GO

-- Creating table 'tblRel_Equipos'
CREATE TABLE [dbo].[tblRel_Equipos] (
    [iIdRelEquipos] int IDENTITY(1,1) NOT NULL,
    [iIdUsuario] uniqueidentifier  NOT NULL,
    [iIdEquipo] uniqueidentifier  NOT NULL,
    [dtFechaIngreso] datetime  NOT NULL
);
GO

-- Creating table 'tblRel_ProcesoRevision'
CREATE TABLE [dbo].[tblRel_ProcesoRevision] (
    [iIdRel_ProcesoRevision] int IDENTITY(1,1) NOT NULL,
    [iIdProceso] int  NOT NULL,
    [iIdEquipo] uniqueidentifier  NOT NULL,
    [iRevision] int  NOT NULL
);
GO

-- Creating table 'tblRel_EquipoFecha'
CREATE TABLE [dbo].[tblRel_EquipoFecha] (
    [iIdRel_EquipoFecha] int IDENTITY(1,1) NOT NULL,
    [iIdEquipo] uniqueidentifier  NOT NULL,
    [dtFechaInicio] datetime  NOT NULL,
    [dtFechaFin] datetime  NOT NULL
);
GO

-- Creating table 'tblCat_Plan'
CREATE TABLE [dbo].[tblCat_Plan] (
    [iIdPlan] int IDENTITY(1,1) NOT NULL,
    [dtFechaCreacion] datetime  NOT NULL
);
GO

-- Creating table 'tblCat_TipoTarea'
CREATE TABLE [dbo].[tblCat_TipoTarea] (
    [iIdTipoTarea] int IDENTITY(1,1) NOT NULL,
    [cNombreTarea] varchar(max)  NOT NULL,
    [cUnidad_de_medida] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'tblCat_Sistema'
CREATE TABLE [dbo].[tblCat_Sistema] (
    [iIdSistema] int IDENTITY(1,1) NOT NULL,
    [cNombreSistema] varchar(150)  NULL,
    [cDescripcion] varchar(max)  NOT NULL,
    [cRuta] varchar(70)  NULL,
    [iOrden] int  NOT NULL,
    [iImagen] int  NOT NULL,
    [dtAlta] datetime  NOT NULL,
    [dtModificacion] datetime  NULL,
    [lActivo] bit  NOT NULL,
    [cCheckSum] varchar(max)  NULL,
    [lFrontEnd] bit  NOT NULL
);
GO

-- Creating table 'tblCat_Proceso'
CREATE TABLE [dbo].[tblCat_Proceso] (
    [iIdProceso] int IDENTITY(1,1) NOT NULL,
    [cNombreProceso] varchar(150)  NULL,
    [cDescripcion] varchar(250)  NULL,
    [iOrden] int  NOT NULL,
    [dtAlta] datetime  NOT NULL,
    [dtModificacion] datetime  NULL,
    [lActivo] bit  NOT NULL,
    [lEditable] bit  NULL,
    [iTipoProceso] int  NOT NULL,
    [lVisualizarCombo] bit  NOT NULL
);
GO

-- Creating table 'tblCat_VersionProceso'
CREATE TABLE [dbo].[tblCat_VersionProceso] (
    [iIdVersionProceso] int IDENTITY(1,1) NOT NULL,
    [iIdProceso] int  NOT NULL,
    [iNumeroVersion] int  NOT NULL
);
GO

-- Creating table 'tblRel_EquipoPlan'
CREATE TABLE [dbo].[tblRel_EquipoPlan] (
    [iIdRelEquipoPlan] int IDENTITY(1,1) NOT NULL,
    [iIdEquipo] uniqueidentifier  NOT NULL,
    [iIdPlan] int  NOT NULL
);
GO

-- Creating table 'tblCat_Perfil'
CREATE TABLE [dbo].[tblCat_Perfil] (
    [iIdPerfil] int IDENTITY(1,1) NOT NULL,
    [cNombre] nvarchar(max)  NOT NULL,
    [iPrioridad] int  NOT NULL
);
GO

-- Creating table 'tblRel_UsuarioPerfil'
CREATE TABLE [dbo].[tblRel_UsuarioPerfil] (
    [iIdRelUsuarioPerfil] int IDENTITY(1,1) NOT NULL,
    [iIdUsuario] uniqueidentifier  NOT NULL,
    [iIdPerfil] int  NOT NULL
);
GO

-- Creating table 'tblCat_ControlesUI'
CREATE TABLE [dbo].[tblCat_ControlesUI] (
    [iIdControlesUI] int IDENTITY(1,1) NOT NULL,
    [cIdHTML] nvarchar(max)  NOT NULL,
    [lHabilitado] bit  NOT NULL,
    [iIdPerfil] int  NOT NULL
);
GO

-- Creating table 'tblCat_TareasOpcionales'
CREATE TABLE [dbo].[tblCat_TareasOpcionales] (
    [iIdTareaOpcional] int IDENTITY(1,1) NOT NULL,
    [cNombreTareaOpcional] varchar(max)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [iIdModulo] in table 'tblCat_Modulo'
ALTER TABLE [dbo].[tblCat_Modulo]
ADD CONSTRAINT [PK_tblCat_Modulo]
    PRIMARY KEY CLUSTERED ([iIdModulo] ASC);
GO

-- Creating primary key on [iIdDetalleProceso] in table 'tblCat_DetalleProceso'
ALTER TABLE [dbo].[tblCat_DetalleProceso]
ADD CONSTRAINT [PK_tblCat_DetalleProceso]
    PRIMARY KEY CLUSTERED ([iIdDetalleProceso] ASC);
GO

-- Creating primary key on [iIdWBS], [iRequerimiento], [iIdProcesos], [iIdPlan] in table 'tblCat_WBS'
ALTER TABLE [dbo].[tblCat_WBS]
ADD CONSTRAINT [PK_tblCat_WBS]
    PRIMARY KEY CLUSTERED ([iIdWBS], [iRequerimiento], [iIdProcesos], [iIdPlan] ASC);
GO

-- Creating primary key on [iIdEquipo] in table 'tblCat_Equipo'
ALTER TABLE [dbo].[tblCat_Equipo]
ADD CONSTRAINT [PK_tblCat_Equipo]
    PRIMARY KEY CLUSTERED ([iIdEquipo] ASC);
GO

-- Creating primary key on [iIdUsuario] in table 'tblCat_Usuarios'
ALTER TABLE [dbo].[tblCat_Usuarios]
ADD CONSTRAINT [PK_tblCat_Usuarios]
    PRIMARY KEY CLUSTERED ([iIdUsuario] ASC);
GO

-- Creating primary key on [iIdRelEquipos] in table 'tblRel_Equipos'
ALTER TABLE [dbo].[tblRel_Equipos]
ADD CONSTRAINT [PK_tblRel_Equipos]
    PRIMARY KEY CLUSTERED ([iIdRelEquipos] ASC);
GO

-- Creating primary key on [iIdRel_ProcesoRevision] in table 'tblRel_ProcesoRevision'
ALTER TABLE [dbo].[tblRel_ProcesoRevision]
ADD CONSTRAINT [PK_tblRel_ProcesoRevision]
    PRIMARY KEY CLUSTERED ([iIdRel_ProcesoRevision] ASC);
GO

-- Creating primary key on [iIdRel_EquipoFecha] in table 'tblRel_EquipoFecha'
ALTER TABLE [dbo].[tblRel_EquipoFecha]
ADD CONSTRAINT [PK_tblRel_EquipoFecha]
    PRIMARY KEY CLUSTERED ([iIdRel_EquipoFecha] ASC);
GO

-- Creating primary key on [iIdPlan] in table 'tblCat_Plan'
ALTER TABLE [dbo].[tblCat_Plan]
ADD CONSTRAINT [PK_tblCat_Plan]
    PRIMARY KEY CLUSTERED ([iIdPlan] ASC);
GO

-- Creating primary key on [iIdTipoTarea] in table 'tblCat_TipoTarea'
ALTER TABLE [dbo].[tblCat_TipoTarea]
ADD CONSTRAINT [PK_tblCat_TipoTarea]
    PRIMARY KEY CLUSTERED ([iIdTipoTarea] ASC);
GO

-- Creating primary key on [iIdSistema] in table 'tblCat_Sistema'
ALTER TABLE [dbo].[tblCat_Sistema]
ADD CONSTRAINT [PK_tblCat_Sistema]
    PRIMARY KEY CLUSTERED ([iIdSistema] ASC);
GO

-- Creating primary key on [iIdProceso] in table 'tblCat_Proceso'
ALTER TABLE [dbo].[tblCat_Proceso]
ADD CONSTRAINT [PK_tblCat_Proceso]
    PRIMARY KEY CLUSTERED ([iIdProceso] ASC);
GO

-- Creating primary key on [iIdVersionProceso] in table 'tblCat_VersionProceso'
ALTER TABLE [dbo].[tblCat_VersionProceso]
ADD CONSTRAINT [PK_tblCat_VersionProceso]
    PRIMARY KEY CLUSTERED ([iIdVersionProceso] ASC);
GO

-- Creating primary key on [iIdRelEquipoPlan] in table 'tblRel_EquipoPlan'
ALTER TABLE [dbo].[tblRel_EquipoPlan]
ADD CONSTRAINT [PK_tblRel_EquipoPlan]
    PRIMARY KEY CLUSTERED ([iIdRelEquipoPlan] ASC);
GO

-- Creating primary key on [iIdPerfil] in table 'tblCat_Perfil'
ALTER TABLE [dbo].[tblCat_Perfil]
ADD CONSTRAINT [PK_tblCat_Perfil]
    PRIMARY KEY CLUSTERED ([iIdPerfil] ASC);
GO

-- Creating primary key on [iIdRelUsuarioPerfil] in table 'tblRel_UsuarioPerfil'
ALTER TABLE [dbo].[tblRel_UsuarioPerfil]
ADD CONSTRAINT [PK_tblRel_UsuarioPerfil]
    PRIMARY KEY CLUSTERED ([iIdRelUsuarioPerfil] ASC);
GO

-- Creating primary key on [iIdControlesUI] in table 'tblCat_ControlesUI'
ALTER TABLE [dbo].[tblCat_ControlesUI]
ADD CONSTRAINT [PK_tblCat_ControlesUI]
    PRIMARY KEY CLUSTERED ([iIdControlesUI] ASC);
GO

-- Creating primary key on [iIdTareaOpcional] in table 'tblCat_TareasOpcionales'
ALTER TABLE [dbo].[tblCat_TareasOpcionales]
ADD CONSTRAINT [PK_tblCat_TareasOpcionales]
    PRIMARY KEY CLUSTERED ([iIdTareaOpcional] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [iIdDetalleProceso] in table 'tblCat_WBS'
ALTER TABLE [dbo].[tblCat_WBS]
ADD CONSTRAINT [FK_tblCat_Title_iIdTitle]
    FOREIGN KEY ([iIdDetalleProceso])
    REFERENCES [dbo].[tblCat_DetalleProceso]
        ([iIdDetalleProceso])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_Title_iIdTitle'
CREATE INDEX [IX_FK_tblCat_Title_iIdTitle]
ON [dbo].[tblCat_WBS]
    ([iIdDetalleProceso]);
GO

-- Creating foreign key on [iIdEquipo] in table 'tblRel_Equipos'
ALTER TABLE [dbo].[tblRel_Equipos]
ADD CONSTRAINT [FK_tblRel_Equipos_iIdEquipo]
    FOREIGN KEY ([iIdEquipo])
    REFERENCES [dbo].[tblCat_Equipo]
        ([iIdEquipo])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblRel_Equipos_iIdEquipo'
CREATE INDEX [IX_FK_tblRel_Equipos_iIdEquipo]
ON [dbo].[tblRel_Equipos]
    ([iIdEquipo]);
GO

-- Creating foreign key on [iIdEquipo] in table 'tblRel_ProcesoRevision'
ALTER TABLE [dbo].[tblRel_ProcesoRevision]
ADD CONSTRAINT [FK_tblRel_ProcesoRevision_iIdEquipo]
    FOREIGN KEY ([iIdEquipo])
    REFERENCES [dbo].[tblCat_Equipo]
        ([iIdEquipo])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblRel_ProcesoRevision_iIdEquipo'
CREATE INDEX [IX_FK_tblRel_ProcesoRevision_iIdEquipo]
ON [dbo].[tblRel_ProcesoRevision]
    ([iIdEquipo]);
GO

-- Creating foreign key on [iIdUsuario] in table 'tblRel_Equipos'
ALTER TABLE [dbo].[tblRel_Equipos]
ADD CONSTRAINT [FK_tblRel_Equipos_iIdUsuario]
    FOREIGN KEY ([iIdUsuario])
    REFERENCES [dbo].[tblCat_Usuarios]
        ([iIdUsuario])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblRel_Equipos_iIdUsuario'
CREATE INDEX [IX_FK_tblRel_Equipos_iIdUsuario]
ON [dbo].[tblRel_Equipos]
    ([iIdUsuario]);
GO

-- Creating foreign key on [iIdEquipo] in table 'tblRel_EquipoFecha'
ALTER TABLE [dbo].[tblRel_EquipoFecha]
ADD CONSTRAINT [FK_tblRel_EquipoFecha_iIdEquipo]
    FOREIGN KEY ([iIdEquipo])
    REFERENCES [dbo].[tblCat_Equipo]
        ([iIdEquipo])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblRel_EquipoFecha_iIdEquipo'
CREATE INDEX [IX_FK_tblRel_EquipoFecha_iIdEquipo]
ON [dbo].[tblRel_EquipoFecha]
    ([iIdEquipo]);
GO

-- Creating foreign key on [iIdPlan] in table 'tblCat_WBS'
ALTER TABLE [dbo].[tblCat_WBS]
ADD CONSTRAINT [FK_tblCat_WBS_iIdPlan]
    FOREIGN KEY ([iIdPlan])
    REFERENCES [dbo].[tblCat_Plan]
        ([iIdPlan])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_WBS_iIdPlan'
CREATE INDEX [IX_FK_tblCat_WBS_iIdPlan]
ON [dbo].[tblCat_WBS]
    ([iIdPlan]);
GO

-- Creating foreign key on [iIdSistema] in table 'tblCat_Modulo'
ALTER TABLE [dbo].[tblCat_Modulo]
ADD CONSTRAINT [FK_tblCat_Modulo_iIdSistema]
    FOREIGN KEY ([iIdSistema])
    REFERENCES [dbo].[tblCat_Sistema]
        ([iIdSistema])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_Modulo_iIdSistema'
CREATE INDEX [IX_FK_tblCat_Modulo_iIdSistema]
ON [dbo].[tblCat_Modulo]
    ([iIdSistema]);
GO

-- Creating foreign key on [iIdProceso] in table 'tblCat_DetalleProceso'
ALTER TABLE [dbo].[tblCat_DetalleProceso]
ADD CONSTRAINT [FK_tblCat_DetalleProceso_iIdProceso]
    FOREIGN KEY ([iIdProceso])
    REFERENCES [dbo].[tblCat_Proceso]
        ([iIdProceso])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_DetalleProceso_iIdProceso'
CREATE INDEX [IX_FK_tblCat_DetalleProceso_iIdProceso]
ON [dbo].[tblCat_DetalleProceso]
    ([iIdProceso]);
GO

-- Creating foreign key on [iIdProceso] in table 'tblRel_ProcesoRevision'
ALTER TABLE [dbo].[tblRel_ProcesoRevision]
ADD CONSTRAINT [FK__tblRel_ProcesoRevision_iIdProceso]
    FOREIGN KEY ([iIdProceso])
    REFERENCES [dbo].[tblCat_Proceso]
        ([iIdProceso])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__tblRel_ProcesoRevision_iIdProceso'
CREATE INDEX [IX_FK__tblRel_ProcesoRevision_iIdProceso]
ON [dbo].[tblRel_ProcesoRevision]
    ([iIdProceso]);
GO

-- Creating foreign key on [iIdProcesos] in table 'tblCat_WBS'
ALTER TABLE [dbo].[tblCat_WBS]
ADD CONSTRAINT [FK_tblCat_WBS_iIdProcesos]
    FOREIGN KEY ([iIdProcesos])
    REFERENCES [dbo].[tblCat_Proceso]
        ([iIdProceso])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_WBS_iIdProcesos'
CREATE INDEX [IX_FK_tblCat_WBS_iIdProcesos]
ON [dbo].[tblCat_WBS]
    ([iIdProcesos]);
GO

-- Creating foreign key on [iIdProceso] in table 'tblCat_VersionProceso'
ALTER TABLE [dbo].[tblCat_VersionProceso]
ADD CONSTRAINT [FK_iIdProceso]
    FOREIGN KEY ([iIdProceso])
    REFERENCES [dbo].[tblCat_Proceso]
        ([iIdProceso])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_iIdProceso'
CREATE INDEX [IX_FK_iIdProceso]
ON [dbo].[tblCat_VersionProceso]
    ([iIdProceso]);
GO

-- Creating foreign key on [iIdVersionProceso] in table 'tblCat_DetalleProceso'
ALTER TABLE [dbo].[tblCat_DetalleProceso]
ADD CONSTRAINT [FK_tblCat_VersionProcesotblCat_DetalleProceso]
    FOREIGN KEY ([iIdVersionProceso])
    REFERENCES [dbo].[tblCat_VersionProceso]
        ([iIdVersionProceso])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_VersionProcesotblCat_DetalleProceso'
CREATE INDEX [IX_FK_tblCat_VersionProcesotblCat_DetalleProceso]
ON [dbo].[tblCat_DetalleProceso]
    ([iIdVersionProceso]);
GO

-- Creating foreign key on [iIdUsuario] in table 'tblRel_UsuarioPerfil'
ALTER TABLE [dbo].[tblRel_UsuarioPerfil]
ADD CONSTRAINT [FK_tblCat_UsuariostblRel_UsuarioPerfil]
    FOREIGN KEY ([iIdUsuario])
    REFERENCES [dbo].[tblCat_Usuarios]
        ([iIdUsuario])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_UsuariostblRel_UsuarioPerfil'
CREATE INDEX [IX_FK_tblCat_UsuariostblRel_UsuarioPerfil]
ON [dbo].[tblRel_UsuarioPerfil]
    ([iIdUsuario]);
GO

-- Creating foreign key on [iIdPerfil] in table 'tblRel_UsuarioPerfil'
ALTER TABLE [dbo].[tblRel_UsuarioPerfil]
ADD CONSTRAINT [FK_tblCat_PerfiltblRel_UsuarioPerfil]
    FOREIGN KEY ([iIdPerfil])
    REFERENCES [dbo].[tblCat_Perfil]
        ([iIdPerfil])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_PerfiltblRel_UsuarioPerfil'
CREATE INDEX [IX_FK_tblCat_PerfiltblRel_UsuarioPerfil]
ON [dbo].[tblRel_UsuarioPerfil]
    ([iIdPerfil]);
GO

-- Creating foreign key on [iIdPerfil] in table 'tblCat_ControlesUI'
ALTER TABLE [dbo].[tblCat_ControlesUI]
ADD CONSTRAINT [FK_tblCat_PerfiltblCat_ControlesUI]
    FOREIGN KEY ([iIdPerfil])
    REFERENCES [dbo].[tblCat_Perfil]
        ([iIdPerfil])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_PerfiltblCat_ControlesUI'
CREATE INDEX [IX_FK_tblCat_PerfiltblCat_ControlesUI]
ON [dbo].[tblCat_ControlesUI]
    ([iIdPerfil]);
GO

-- Creating foreign key on [iIdEquipo] in table 'tblRel_EquipoPlan'
ALTER TABLE [dbo].[tblRel_EquipoPlan]
ADD CONSTRAINT [FK_tblCat_EquipotblRel_EquipoPlan]
    FOREIGN KEY ([iIdEquipo])
    REFERENCES [dbo].[tblCat_Equipo]
        ([iIdEquipo])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_EquipotblRel_EquipoPlan'
CREATE INDEX [IX_FK_tblCat_EquipotblRel_EquipoPlan]
ON [dbo].[tblRel_EquipoPlan]
    ([iIdEquipo]);
GO

-- Creating foreign key on [iIdPlan] in table 'tblRel_EquipoPlan'
ALTER TABLE [dbo].[tblRel_EquipoPlan]
ADD CONSTRAINT [FK_tblCat_PlantblRel_EquipoPlan]
    FOREIGN KEY ([iIdPlan])
    REFERENCES [dbo].[tblCat_Plan]
        ([iIdPlan])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_PlantblRel_EquipoPlan'
CREATE INDEX [IX_FK_tblCat_PlantblRel_EquipoPlan]
ON [dbo].[tblRel_EquipoPlan]
    ([iIdPlan]);
GO

-- Creating foreign key on [iIdUsuario] in table 'tblCat_WBS'
ALTER TABLE [dbo].[tblCat_WBS]
ADD CONSTRAINT [FK_tblCat_UsuariostblCat_WBS]
    FOREIGN KEY ([iIdUsuario])
    REFERENCES [dbo].[tblCat_Usuarios]
        ([iIdUsuario])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_UsuariostblCat_WBS'
CREATE INDEX [IX_FK_tblCat_UsuariostblCat_WBS]
ON [dbo].[tblCat_WBS]
    ([iIdUsuario]);
GO

-- Creating foreign key on [iIdTipoTarea] in table 'tblCat_DetalleProceso'
ALTER TABLE [dbo].[tblCat_DetalleProceso]
ADD CONSTRAINT [FK_tblCat_TipoTareatblCat_DetalleProceso_iIdTipoTarea]
    FOREIGN KEY ([iIdTipoTarea])
    REFERENCES [dbo].[tblCat_TipoTarea]
        ([iIdTipoTarea])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_TipoTareatblCat_DetalleProceso_iIdTipoTarea'
CREATE INDEX [IX_FK_tblCat_TipoTareatblCat_DetalleProceso_iIdTipoTarea]
ON [dbo].[tblCat_DetalleProceso]
    ([iIdTipoTarea]);
GO

-- Creating foreign key on [iIdTipoTarea] in table 'tblCat_WBS'
ALTER TABLE [dbo].[tblCat_WBS]
ADD CONSTRAINT [FK_tblCat_WBStblCat_TipoTarea_iIdTipoTarea]
    FOREIGN KEY ([iIdTipoTarea])
    REFERENCES [dbo].[tblCat_TipoTarea]
        ([iIdTipoTarea])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tblCat_WBStblCat_TipoTarea_iIdTipoTarea'
CREATE INDEX [IX_FK_tblCat_WBStblCat_TipoTarea_iIdTipoTarea]
ON [dbo].[tblCat_WBS]
    ([iIdTipoTarea]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------