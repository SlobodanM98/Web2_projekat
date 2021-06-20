using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web2BackEnd.Migrations
{
    public partial class initialWorkPlan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WorkPlanInstructions",
                columns: table => new
                {
                    InstructionID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeviceID = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkPlanInstructions", x => x.InstructionID);
                    table.ForeignKey(
                        name: "FK_WorkPlanInstructions_Devices_DeviceID",
                        column: x => x.DeviceID,
                        principalTable: "Devices",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkPlans",
                columns: table => new
                {
                    WorkPlanID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    AddressID = table.Column<int>(nullable: false),
                    CreatedBy = table.Column<string>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    Purpose = table.Column<string>(nullable: true),
                    Notes = table.Column<string>(nullable: true),
                    Company = table.Column<string>(nullable: false),
                    Phone = table.Column<int>(nullable: false),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    DeviceID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkPlans", x => x.WorkPlanID);
                    table.ForeignKey(
                        name: "FK_WorkPlans_Addresses_AddressID",
                        column: x => x.AddressID,
                        principalTable: "Addresses",
                        principalColumn: "AddressID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkPlanStatusHistories",
                columns: table => new
                {
                    WorkPlanStatusHistoryID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(nullable: false),
                    ChangedBy = table.Column<string>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkPlanStatusHistories", x => x.WorkPlanStatusHistoryID);
                });

            migrationBuilder.CreateTable(
                name: "WorkPlanImages",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImagePath = table.Column<string>(nullable: false),
                    Image = table.Column<byte[]>(nullable: false),
                    WorkPlanID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkPlanImages", x => x.ID);
                    table.ForeignKey(
                        name: "FK_WorkPlanImages_WorkPlans_WorkPlanID",
                        column: x => x.WorkPlanID,
                        principalTable: "WorkPlans",
                        principalColumn: "WorkPlanID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkPlanImages_WorkPlanID",
                table: "WorkPlanImages",
                column: "WorkPlanID");

            migrationBuilder.CreateIndex(
                name: "IX_WorkPlanInstructions_DeviceID",
                table: "WorkPlanInstructions",
                column: "DeviceID");

            migrationBuilder.CreateIndex(
                name: "IX_WorkPlans_AddressID",
                table: "WorkPlans",
                column: "AddressID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkPlanImages");

            migrationBuilder.DropTable(
                name: "WorkPlanInstructions");

            migrationBuilder.DropTable(
                name: "WorkPlanStatusHistories");

            migrationBuilder.DropTable(
                name: "WorkPlans");
        }
    }
}
