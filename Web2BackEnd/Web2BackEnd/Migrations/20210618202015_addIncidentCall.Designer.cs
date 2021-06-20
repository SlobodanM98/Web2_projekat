﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Web2BackEnd.Data;

namespace Web2BackEnd.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210618202015_addIncidentCall")]
    partial class addIncidentCall
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Web2BackEnd.Models.Address", b =>
                {
                    b.Property<int>("AddressID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<int>("PostalNumber")
                        .HasColumnType("int");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AddressID");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("Web2BackEnd.Models.Call", b =>
                {
                    b.Property<int>("CallID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AddressID")
                        .HasColumnType("int");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<int>("Reason")
                        .HasColumnType("int");

                    b.HasKey("CallID");

                    b.HasIndex("AddressID");

                    b.ToTable("Calls");
                });

            modelBuilder.Entity("Web2BackEnd.Models.Consumer", b =>
                {
                    b.Property<int>("ConsumerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AddressID")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PhoneNumber")
                        .HasColumnType("int");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("ConsumerID");

                    b.HasIndex("AddressID");

                    b.ToTable("Consumers");
                });

            modelBuilder.Entity("Web2BackEnd.Models.Device", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AddressID")
                        .HasColumnType("int");

                    b.Property<float>("LatCoord")
                        .HasColumnType("real");

                    b.Property<float>("LongCoord")
                        .HasColumnType("real");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("AddressID");

                    b.ToTable("Devices");
                });

            modelBuilder.Entity("Web2BackEnd.Models.Incident", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ATA")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ETA")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ETR")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Konstrukcija")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Materijal")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("NivoNapona")
                        .HasColumnType("real");

                    b.Property<string>("PVR")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Poduzrok")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("Potvrdjen")
                        .HasColumnType("bit");

                    b.Property<int?>("Prioritet")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TeamID")
                        .HasColumnType("int");

                    b.Property<int>("Tip")
                        .HasColumnType("int");

                    b.Property<string>("Uzrok")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VremeIncidenta")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.HasIndex("TeamID");

                    b.ToTable("Incidents");
                });

            modelBuilder.Entity("Web2BackEnd.Models.IncidentCall", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CallID")
                        .HasColumnType("int");

                    b.Property<int>("IncidentID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("IncidentCalls");
                });

            modelBuilder.Entity("Web2BackEnd.Models.IncidentDevice", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DeviceID")
                        .HasColumnType("int");

                    b.Property<int>("IncidentID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("IncidentDevices");
                });

            modelBuilder.Entity("Web2BackEnd.Models.Notification", b =>
                {
                    b.Property<int>("NotificationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("HasLink")
                        .HasColumnType("bit");

                    b.Property<bool>("IsRead")
                        .HasColumnType("bit");

                    b.Property<string>("Link")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("NotificationID");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("Web2BackEnd.Models.SafetyDocument", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DateOfCreation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Details")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNum")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlanRada")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Team")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("tipDokumenta")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("Documents");
                });

            modelBuilder.Entity("Web2BackEnd.Models.Settings", b =>
                {
                    b.Property<int>("settingsID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("errorEnabled")
                        .HasColumnType("bit");

                    b.Property<bool>("infoEnabled")
                        .HasColumnType("bit");

                    b.Property<bool>("showFields")
                        .HasColumnType("bit");

                    b.Property<bool>("successEnabled")
                        .HasColumnType("bit");

                    b.Property<bool>("warningEnabled")
                        .HasColumnType("bit");

                    b.HasKey("settingsID");

                    b.ToTable("Settings");
                });

            modelBuilder.Entity("Web2BackEnd.Models.Team", b =>
                {
                    b.Property<int>("TeamID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TeamID");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("Web2BackEnd.Models.TeamUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("TeamID")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("TeamUsers");
                });

            modelBuilder.Entity("Web2BackEnd.Models.Call", b =>
                {
                    b.HasOne("Web2BackEnd.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Web2BackEnd.Models.Consumer", b =>
                {
                    b.HasOne("Web2BackEnd.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Web2BackEnd.Models.Device", b =>
                {
                    b.HasOne("Web2BackEnd.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Web2BackEnd.Models.Incident", b =>
                {
                    b.HasOne("Web2BackEnd.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamID");
                });
#pragma warning restore 612, 618
        }
    }
}
