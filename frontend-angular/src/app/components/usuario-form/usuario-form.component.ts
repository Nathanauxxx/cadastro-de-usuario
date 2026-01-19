import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm: FormGroup;
  isEditMode = false;
  hidePassword = true;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<UsuarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario },
    private snackBar: MatSnackBar
  ) {
    this.isEditMode = !!data.usuario;
    
    this.usuarioForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^[\d\s\(\)\-\+]+$/)]],
      senha: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.usuario) {
      this.usuarioForm.patchValue({
        nome: this.data.usuario.nome,
        email: this.data.usuario.email,
        telefone: this.data.usuario.telefone
      });
    }
  }

  get f() {
    return this.usuarioForm.controls;
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const usuario: Usuario = this.usuarioForm.value;

    if (this.isEditMode && this.data.usuario.id) {
      // Se não preencheu senha, remove do objeto
      if (!usuario.senha) {
        delete usuario.senha;
      }
      
      this.usuarioService.updateUsuario(this.data.usuario.id, usuario).subscribe({
        next: (response) => {
          this.snackBar.open('Usuário atualizado com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.loading = false;
          const errorMessage = error.error?.message || 'Erro ao atualizar usuário';
          this.snackBar.open(errorMessage, 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.usuarioService.createUsuario(usuario).subscribe({
        next: (response) => {
          this.snackBar.open('Usuário criado com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.loading = false;
          const errorMessage = error.error?.message || 'Erro ao criar usuário';
          this.snackBar.open(errorMessage, 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
