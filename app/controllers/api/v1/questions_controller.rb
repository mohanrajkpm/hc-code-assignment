module Api
  module V1
    class QuestionsController < ApplicationController
      #skip authentication
      skip_before_action :verify_authenticity_token
      #find question before action
      before_action :find_question, only: %i[show destroy update]
      # render all questions
      def index
        questions = Question.joins(:role, :mapping)
                            .select('questions.name as name, questions.id as id, roles.name as role_name
                                    , mappings.name as mapping_name, role_id, mapping_id').order(id: :desc)
                            .page(params[:page])
        # render json: questions
        render json: { questions: questions, question_count: questions.count, success: true }, status: :ok
      end

      # create question
      def create
        question = Question.new(question_params)
        if question.save
          render json: question, status: :created
        else
          render json: question.errors, status: :unprocessable_entity
        end
      end

      # show question details
      def show
        question = {name: @question.name, role_name: @question.role_name, mapping_name: @question.mapping_name,
                     role_id: @question.role_id, mapping_id: @question.mapping_id}
        render json: question
      end

      # Update question
      def update
        if @question.update_attributes(question_params)
          render json: @question
        else
          render json: @question.errors, status: :unprocessable_entity
        end
      end

      # delete question
      def destroy
        if @question.destroy
          head :no_content, status: :ok
        else
          render json: @question.errors, status: :unprocessable_entity
        end
      end
      # fetch roles
      def fetch_roles
        roles = Role.select('roles.id as role_id, roles.name as role_name')
        render json: roles
      end
      # fetch mappings
      def fetch_mappings
        roles = Mapping.select('mappings.id as mapping_id, mappings.name as mapping_name')
        render json: roles
      end

      private
      #find question
      def find_question
        @question = Question.find(params[:id])
      end
      #permit question params
      def question_params
        params.require(:question).permit(:name, :role_id, :mapping_id)
      end
    end
  end
end