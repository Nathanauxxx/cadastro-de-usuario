import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'email', 'telefone', 'acoes'];
  dataSource = new MatTableDataSource<Usuario>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20, 50];
  
  filtro = '';
  private filtroSubject = new Subject<string>();
  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.filtroSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(filtro => {
      this.filtro = filtro;
      this.pageIndex = 0;
      this.loadUsuarios();
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.usuarioService.getUsuarios(this.pageIndex, this.pageSize, this.filtro)
      .subscribe({
        next: (data) => {
          this.dataSource.data = data.content;
          this.totalElements = data.totalElements;
          this.loading = false;
        },
        error: (error) => {
          this.snackBar.open('Erro ao carregar usuários', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.loading = false;
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsuarios();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtroSubject.next(filterValue.trim().toLowerCase());
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UsuarioFormComponent, {
      width: '600px',
      data: { usuario: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsuarios();
      }
    });
  }

  openEditDialog(usuario: Usuario): void {
    const dialogRef = this.dialog.open(UsuarioFormComponent, {
      width: '600px',
      data: { usuario: { ...usuario } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsuarios();
      }
    });
  }

  deleteUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Exclusão',
        message: `Deseja realmente excluir o usuário ${usuario.nome}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && usuario.id) {
        this.usuarioService.deleteUsuario(usuario.id).subscribe({
          next: () => {
            this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', {
              duration: 3000
            });
            this.loadUsuarios();
          },
          error: (error) => {
            this.snackBar.open('Erro ao excluir usuário', 'Fechar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }
}
