// view-reservations.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Excel from 'exceljs';
import saveAs from 'file-saver';
import { IReservation } from '../../models/reservation/reservation.interface';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.scss'],
  standalone: false
})
export class ViewReservationsComponent implements OnInit {
  reservations: IReservation[] = [];
  filteredReservations: IReservation[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.http.get<IReservation[]>('/api/reservations').subscribe((data) => {
      this.reservations = data;
      this.filteredReservations = data;
    });
  }

  searchReservations() {
    this.filteredReservations = this.reservations.filter((reservation) =>
      Object.values(reservation).some((value) =>
        String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    );
  }

  downloadExcel(): void {
    if (this.reservations.length === 0) {
      alert("No reservations to export.");
      return;
    }
  
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Reservations");
  
    // Define headers dynamically from the reservation structure
    const headers = Object.keys(this.reservations[0]) as (keyof IReservation)[];
  
    worksheet.columns = headers.map((key) => ({
      header: key,
      key: key,
    }));
  
    // Map each reservation to a record that matches ExcelJS expectations
    this.reservations.forEach((reservation) => {
      const rowData: Record<string, string | number | Date | undefined> = {};
  
      headers.forEach((key) => {
        rowData[key] = reservation[key] ?? ""; // Use an empty string if value is undefined
      });
  
      worksheet.addRow(rowData);
    });
  
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), "reservations.xlsx");
    });
  }  
}
